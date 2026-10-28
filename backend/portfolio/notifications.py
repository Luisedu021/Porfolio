"""Avisos de uma nova mensagem: e-mail para o dono do site e confirmação no WhatsApp para quem enviou."""

import json
import logging
import re
import urllib.error
import urllib.request

from django.conf import settings
from django.core.mail import send_mail

logger = logging.getLogger('portfolio')

GRAPH_URL = 'https://graph.facebook.com/v21.0/{phone_id}/messages'


def notify_owner(msg):
    """E-mail para NOTIFY_EMAIL com os dados da mensagem. Retorna True se enviou."""
    if not settings.NOTIFY_EMAIL:
        return False
    body = '\n'.join([
        f'Nome: {msg.name}',
        f'E-mail: {msg.email}',
        f'WhatsApp: {msg.phone or "-"}',
        f'Localização: {msg.location or "-"}',
        f'Projeto: {msg.project}',
        '',
        msg.message,
    ])
    send_mail(
        subject=f'Novo contato pelo portfólio: {msg.project}',
        message=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.NOTIFY_EMAIL],
    )
    return True


def normalize_phone(phone):
    """Só dígitos, com DDI. Números brasileiros sem DDI (10 ou 11 dígitos) ganham o 55."""
    digits = re.sub(r'\D', '', phone or '')
    if len(digits) in (10, 11):
        digits = f'55{digits}'
    return digits if len(digits) >= 12 else ''


def confirm_on_whatsapp(msg):
    """Envia o modelo aprovado na Meta para o WhatsApp de quem escreveu. Retorna True se enviou."""
    to = normalize_phone(msg.phone)
    if not (settings.WHATSAPP_TOKEN and settings.WHATSAPP_PHONE_NUMBER_ID and to):
        return False

    payload = {
        'messaging_product': 'whatsapp',
        'to': to,
        'type': 'template',
        'template': {
            'name': settings.WHATSAPP_TEMPLATE,
            'language': {'code': settings.WHATSAPP_TEMPLATE_LANG},
            'components': [{'type': 'body', 'parameters': [{'type': 'text', 'text': msg.name.split()[0]}]}],
        },
    }
    request = urllib.request.Request(
        GRAPH_URL.format(phone_id=settings.WHATSAPP_PHONE_NUMBER_ID),
        data=json.dumps(payload).encode(),
        headers={'Authorization': f'Bearer {settings.WHATSAPP_TOKEN}', 'Content-Type': 'application/json'},
        method='POST',
    )
    try:
        with urllib.request.urlopen(request, timeout=10):
            return True
    except urllib.error.HTTPError as error:
        raise RuntimeError(f'WhatsApp {error.code}: {error.read().decode(errors="replace")[:500]}') from error


def notify(msg):
    """Roda os dois avisos. Uma falha não impede o outro nem a mensagem de ficar salva."""
    errors = []
    for field, sender in (('email_sent', notify_owner), ('whatsapp_sent', confirm_on_whatsapp)):
        try:
            setattr(msg, field, sender(msg))
        except Exception as error:  # noqa: BLE001 - qualquer falha de envio só é registrada
            logger.exception('Falha ao notificar (%s)', field)
            errors.append(f'{field}: {error}')
    msg.notification_error = '\n'.join(errors)
    msg.save(update_fields=['email_sent', 'whatsapp_sent', 'notification_error'])
