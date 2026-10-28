from django.db import models


class Project(models.Model):
    """Um projeto da seção "Meus projetos". Cada categoria vira uma coluna no site."""

    class Category(models.TextChoices):
        LANDING = 'landing', 'Landing page'
        UIUX = 'uiux', 'UI/UX'
        SOFTWARE = 'software', 'Software'

    key = models.SlugField('identificador', unique=True, help_text='Sem espaços, ex.: dr-garanhani.')
    category = models.CharField('categoria', max_length=20, choices=Category.choices)
    title = models.CharField('título', max_length=120)
    order = models.PositiveIntegerField(
        'ordem', default=0, help_text='Menor aparece primeiro. O primeiro de cada categoria é a capa da coluna.'
    )
    published = models.BooleanField('publicado', default=True)
    tags = models.CharField('tags', max_length=200, blank=True, help_text='Separadas por vírgula, ex.: UI/UX, App.')
    href = models.URLField('link do projeto', blank=True)

    summary_pt = models.TextField('resumo (PT)')
    challenge_pt = models.TextField('desafio (PT)', blank=True)
    result_pt = models.TextField('resultado (PT)', blank=True)
    summary_en = models.TextField('resumo (EN)', blank=True)
    challenge_en = models.TextField('desafio (EN)', blank=True)
    result_en = models.TextField('resultado (EN)', blank=True)

    screen_desktop = models.ImageField('tela do notebook', upload_to='projects/', blank=True)
    screen_tablet = models.ImageField('tela do tablet', upload_to='projects/', blank=True)
    screen_mobile = models.ImageField('tela do celular', upload_to='projects/', blank=True)
    preview = models.ImageField(
        'capa (hover)', upload_to='projects/', blank=True, help_text='Aparece o topo da imagem. Sem capa, usa a tela do celular.'
    )

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'projeto'
        verbose_name_plural = 'projetos'

    def __str__(self):
        return self.title

    def tag_list(self):
        return [tag.strip() for tag in self.tags.split(',') if tag.strip()]


class ContactMessage(models.Model):
    """Mensagem enviada pelo formulário de contato do site."""

    name = models.CharField('nome', max_length=120)
    email = models.EmailField('e-mail')
    phone = models.CharField('WhatsApp', max_length=30, blank=True)
    location = models.CharField('localização', max_length=120, blank=True)
    project = models.CharField('projeto', max_length=200)
    message = models.TextField('mensagem')
    language = models.CharField('idioma do site', max_length=5, default='pt')
    created_at = models.DateTimeField('recebida em', auto_now_add=True)
    read = models.BooleanField('lida', default=False)

    email_sent = models.BooleanField('aviso por e-mail enviado', default=False)
    whatsapp_sent = models.BooleanField('confirmação no WhatsApp enviada', default=False)
    notification_error = models.TextField('erro ao notificar', blank=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'mensagem'
        verbose_name_plural = 'mensagens do formulário'

    def __str__(self):
        return f'{self.name} — {self.project}'
