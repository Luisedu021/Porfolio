from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

admin.site.site_header = 'Painel do portfólio'
admin.site.site_title = 'Painel do portfólio'
admin.site.index_title = 'Conteúdo e mensagens'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('portfolio.urls')),
]

# Em produção as imagens devem ser servidas pelo servidor/armazenamento, não pelo Django.
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
