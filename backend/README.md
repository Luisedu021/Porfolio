# Painel do portfólio (Django)

Back-end do site: painel (Django admin) para os projetos e API para o site e o formulário de contato.

- `GET /api/projects/`: projetos publicados, no formato de `src/data/content.ts`.
- `POST /api/contact/`: salva a mensagem, avisa por e-mail e confirma no WhatsApp de quem enviou.
- `/admin/`: painel (projetos, imagens, textos PT/EN, mensagens recebidas).

## Rodar localmente

```bash
cd backend
python -m venv .venv
.venv\Scripts\python.exe -m pip install -r requirements.txt
copy .env.example .env
.venv\Scripts\python.exe manage.py migrate
.venv\Scripts\python.exe manage.py seed_projects
.venv\Scripts\python.exe manage.py createsuperuser
.venv\Scripts\python.exe manage.py runserver 8010
```

No site, crie `.env.local` na raiz com `VITE_API_URL=http://localhost:8010` e rode `npm run dev`.
Sem `VITE_API_URL`, o site usa os projetos de `src/data/content.ts` e o formulário abre o app de e-mail.

Painel: http://localhost:8010/admin/ (login criado no `createsuperuser`).

## Notificações

- **E-mail para você**: preencha `NOTIFY_EMAIL` e o SMTP no `.env` (ex.: Resend: `EMAIL_HOST=smtp.resend.com`,
  `EMAIL_HOST_USER=resend`, `EMAIL_HOST_PASSWORD=<API key>`). Sem SMTP, o e-mail aparece no terminal.
- **WhatsApp para quem enviou**: crie o app na Meta (WhatsApp Cloud API), aprove um modelo com uma variável
  (o nome da pessoa) e preencha `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID` e `WHATSAPP_TEMPLATE`.
  Sem token, essa etapa é pulada.

Se um aviso falhar, a mensagem continua salva; o erro aparece na mensagem dentro do painel.

## Produção

- `DJANGO_DEBUG=0`, `DJANGO_SECRET_KEY` próprio, `DJANGO_ALLOWED_HOSTS` com o domínio da API,
  `CORS_ALLOWED_ORIGINS` com o domínio do site e `DATABASE_URL` de um PostgreSQL.
- Com `DEBUG=0` o Django não serve `/media/` (as imagens enviadas). Use um disco persistente servido pelo
  servidor web ou um armazenamento de arquivos (ex.: S3/Cloudflare R2 com `django-storages`).
- Rode `python manage.py collectstatic` para os arquivos do admin.

## Testes

```bash
.venv\Scripts\python.exe manage.py test portfolio
```
