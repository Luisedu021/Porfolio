"""Importa para o banco os projetos que hoje estão fixos no site (src/data/content.ts), com as imagens.

Uso: python manage.py seed_projects            (pula os que já existem)
     python manage.py seed_projects --replace  (sobrescreve os existentes)
"""

from pathlib import Path

from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand

from portfolio.models import Project

ASSETS = Path(settings.BASE_DIR).parent / 'src' / 'assets' / 'projects'

PROJECTS = [
    {
        'key': 'garanhani',
        'category': 'landing',
        'title': 'Dr. Rafael Garanhani',
        'tags': 'Landing page, Web',
        'href': 'https://drgaranhani.com.br/',
        'summary_pt': 'Landing page do consultório do Dr. Rafael Garanhani: acupuntura médica, neuromodulação, '
        'homeopatia e clínica geral.',
        'summary_en': "Landing page for Dr. Rafael Garanhani's practice: medical acupuncture, neuromodulation, "
        'homeopathy and general care.',
        'images': {'screen_desktop': 'garanhani-desktop.jpg', 'screen_tablet': 'garanhani-tablet.jpg',
                   'screen_mobile': 'garanhani-mobile.jpg', 'preview': 'garanhani-preview.jpg'},
    },
    {
        'key': 'wellnova',
        'category': 'landing',
        'title': 'Wellnova',
        'tags': 'Landing page, Front-end',
        'href': 'https://wellnova.ai/',
        'summary_pt': 'Hotsite público da Wellnova, plataforma de IA para integridade de poços de óleo e gás. '
        'Atuei na refatoração do código.',
        'summary_en': "Wellnova's public website, an AI platform for oil and gas well integrity. "
        'I worked on refactoring the code.',
        'images': {'screen_desktop': 'wellnova-desktop.jpg', 'screen_tablet': 'wellnova-tablet.jpg',
                   'screen_mobile': 'wellnova-mobile.jpg', 'preview': 'wellnova-preview.jpg'},
    },
    {
        'key': 'ironCapi',
        'category': 'uiux',
        'title': 'Iron Capi',
        'tags': 'UI/UX, App',
        'href': 'https://luisedu021.github.io/Iron-Capi/',
        'summary_pt': 'App de treino Iron Capi: treino do dia, sequência semanal, ranking com amigos e calendário '
        'de treinos, além do painel do time.',
        'summary_en': 'Iron Capi workout app: workout of the day, weekly streak, friends ranking and a training '
        'calendar, plus the team dashboard.',
        'images': {'screen_tablet': 'ironcapi-tablet.jpg', 'screen_mobile': 'ironcapi-mobile.jpg',
                   'preview': 'ironcapi-preview.jpg'},
    },
    {
        'key': 'cop15',
        'category': 'uiux',
        'title': 'COP15 POP UFMS',
        'tags': 'UI/UX, Web',
        'href': '',
        'summary_pt': 'Site da COP15 POP UFMS, a programação aberta da UFMS durante a COP15 de espécies migratórias '
        'em Campo Grande (março de 2026). Fiz o UI/UX pela Mega Jr.',
        'summary_en': "Website for COP15 POP UFMS, UFMS's public program during the COP15 on migratory species in "
        'Campo Grande (March 2026). I did the UI/UX through Mega Jr.',
        'images': {'screen_desktop': 'cop15-desktop.jpg', 'screen_tablet': 'cop15-tablet.jpg',
                   'screen_mobile': 'cop15-mobile.jpg', 'preview': 'cop15-preview.jpg'},
    },
    {
        'key': 'wellnovaApp',
        'category': 'software',
        'title': 'Wellnova',
        'tags': 'Software, Dashboard',
        'href': '',
        'summary_pt': 'Plataforma de IA da Wellnova para integridade de poços de óleo e gás. Atuei no redesign de '
        'um módulo específico do sistema.',
        'summary_en': "Wellnova's AI platform for oil and gas well integrity. I worked on the redesign of a "
        'specific module of the system.',
        # Mesmas imagens do hotsite: as telas internas do sistema não são públicas.
        'images': {'screen_desktop': 'wellnova-desktop.jpg', 'screen_tablet': 'wellnova-tablet.jpg',
                   'screen_mobile': 'wellnova-mobile.jpg', 'preview': 'wellnova-preview.jpg'},
    },
    {
        'key': 'megaAtas',
        'category': 'software',
        'title': 'Mega Jr. Atas',
        'tags': 'JavaScript, API',
        'href': 'https://mega-jr-atas.vercel.app/',
        'summary_pt': 'Gerador de atas de reunião da Mega Jr.: recebe os detalhes, a data e os pontos importantes '
        'e gera o resumo. Meu primeiro projeto com JavaScript e APIs.',
        'summary_en': "Mega Jr.'s meeting minutes generator: it takes the details, the date and the key points and "
        'writes the summary. My first project with JavaScript and APIs.',
        'images': {'screen_desktop': 'megaatas-desktop.jpg', 'screen_tablet': 'megaatas-tablet.jpg',
                   'screen_mobile': 'megaatas-mobile.jpg', 'preview': 'megaatas-preview.jpg'},
    },
]


class Command(BaseCommand):
    help = 'Importa os projetos atuais do site para o banco.'

    def add_arguments(self, parser):
        parser.add_argument('--replace', action='store_true', help='Sobrescreve projetos que já existem.')

    def handle(self, *args, replace=False, **options):
        for order, data in enumerate(PROJECTS):
            data = dict(data)
            images = data.pop('images')
            project = Project.objects.filter(key=data['key']).first()
            if project and not replace:
                self.stdout.write(f'- {data["title"]}: já existe, pulado')
                continue

            project = project or Project(key=data['key'])
            for field, value in data.items():
                setattr(project, field, value)
            project.order = order
            for field, filename in images.items():
                with open(ASSETS / filename, 'rb') as file:
                    getattr(project, field).save(filename, File(file), save=False)
            project.save()
            self.stdout.write(self.style.SUCCESS(f'+ {project.title}'))
