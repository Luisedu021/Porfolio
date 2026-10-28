from django.contrib import admin
from django.utils.html import format_html

from .models import ContactMessage, Project


def thumbnail(image, height=64):
    if not image:
        return '—'
    return format_html('<img src="{}" style="height:{}px;border-radius:6px" />', image.url, height)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'order', 'published', 'cover')
    list_editable = ('order', 'published')
    list_filter = ('category', 'published')
    search_fields = ('title', 'summary_pt')
    prepopulated_fields = {'key': ('title',)}
    readonly_fields = ('cover_large',)
    fieldsets = (
        (None, {'fields': ('title', 'key', 'category', 'order', 'published', 'tags', 'href')}),
        ('Textos em português', {'fields': ('summary_pt', 'challenge_pt', 'result_pt')}),
        ('Textos em inglês', {'fields': ('summary_en', 'challenge_en', 'result_en'), 'classes': ('collapse',)}),
        (
            'Imagens',
            {
                'description': 'Só aparecem os aparelhos com imagem: notebook + tablet + celular, tablet + celular ou só notebook.',
                'fields': ('screen_desktop', 'screen_tablet', 'screen_mobile', 'preview', 'cover_large'),
            },
        ),
    )

    @admin.display(description='capa')
    def cover(self, obj):
        return thumbnail(obj.preview or obj.screen_mobile)

    @admin.display(description='capa atual')
    def cover_large(self, obj):
        return thumbnail(obj.preview or obj.screen_mobile, height=240)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('created_at', 'name', 'project', 'email', 'phone', 'read', 'email_sent', 'whatsapp_sent')
    list_filter = ('read', 'email_sent', 'whatsapp_sent')
    list_editable = ('read',)
    search_fields = ('name', 'email', 'project', 'message')
    readonly_fields = (
        'name', 'email', 'phone', 'location', 'project', 'message', 'language', 'created_at',
        'email_sent', 'whatsapp_sent', 'notification_error',
    )

    def has_add_permission(self, request):
        # Mensagens só chegam pelo formulário do site.
        return False
