import type { Dictionary } from './types'

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacus nunc, posuere in justo vulputate, bibendum sodales.'
const serviceDescription = 'Focado em psicologia do design e layouts que convertem.'
const serviceTags = ['UI/UX', 'Figma', 'Prototipagem']

export const pt: Dictionary = {
  meta: {
    description: 'Luís Eduardo — UI/UX Designer, Product Designer e Desenvolvedor Fullstack.',
  },
  nav: {
    label: 'Principal',
    cta: 'Vamos conversar',
    inicio: 'Home',
    sobre: 'Sobre',
    servicos: 'Serviços',
    experiencia: 'Resumo',
    projetos: 'Projetos',
    contato: 'Contato',
  },
  controls: {
    language: 'Idioma',
    toDark: 'Ativar modo escuro',
    toLight: 'Ativar modo claro',
  },
  hero: {
    badgeName: 'Luís Eduardo',
    badgeRole: 'UI/UX Designer & Fullstack Developer',
    titleStart: 'Onde o design encontra o ',
    titleHighlight: 'código limpo.',
    support: 'Ajudo startups e empresas a criar produtos web e mobile, do protótipo ao deploy.',
    primaryCta: 'Vamos trabalhar juntos',
    secondaryCta: 'Ver projetos',
    photoAlt: 'Foto de Luís Eduardo',
  },
  services: {
    titleLines: ['Como eu ajudo', 'você a crescer?'],
    cta: 'Iniciar projeto',
    expand: (title) => `Ver detalhes de ${title}`,
    collapse: (title) => `Recolher ${title}`,
    flowLabel: 'Como funciona uma automação',
    // TODO: revise os detalhes de cada serviço — são um ponto de partida.
    items: [
      {
        number: '01',
        title: 'IA & automações',
        tags: serviceTags,
        description: serviceDescription,
        details: [
          'Agentes e chatbots com IA para atendimento, vendas e suporte',
          'Automação de tarefas repetitivas e fluxos entre ferramentas',
          'Integrações entre sistemas via APIs e webhooks',
          'Relatórios e dashboards que se atualizam sozinhos',
        ],
        cta: 'Quero automatizar',
        flow: [
          { label: 'Gatilho', detail: 'Mensagem, formulário ou evento' },
          { label: 'Agente de IA', detail: 'Entende, decide e gera a resposta' },
          { label: 'Ação', detail: 'Atualiza CRM, planilha ou responde' },
        ],
      },
      {
        number: '02',
        title: 'Product Design',
        tags: serviceTags,
        description: serviceDescription,
        details: [
          'Descoberta do problema junto aos usuários',
          'Arquitetura de informação e fluxos de navegação',
          'Testes de usabilidade e iteração contínua',
          'Métricas para validar cada decisão de design',
        ],
        cta: 'Desenhar meu produto',
      },
      {
        number: '03',
        title: 'UI/UX Design',
        tags: serviceTags,
        description: serviceDescription,
        details: [
          'Wireframes e protótipos navegáveis no Figma',
          'Interfaces consistentes a partir de um design system',
          'Layouts responsivos focados em conversão',
          'Handoff organizado para o time de desenvolvimento',
        ],
        cta: 'Melhorar minha interface',
      },
      {
        number: '04',
        title: 'Dev. Web',
        tags: serviceTags,
        description: serviceDescription,
        details: [
          'Sites e landing pages rápidos e responsivos',
          'Aplicações web fullstack: front-end, APIs e banco de dados',
          'Deploy, SEO técnico e otimização de performance',
          'Manutenção e evolução contínua do produto',
        ],
        cta: 'Tirar meu site do papel',
      },
    ],
  },
  about: {
    title: 'Sobre',
    body: 'Nisl arcu, scelerisque neque ut. Tincidunt amet, tempor duis tortor neque auctor dis ipsum. Pretium cras amet odio amet eleifend id sed cras sed. Aliquet risus posuere aliquet imperdiet sit.',
  },
  experience: {
    title: 'Minha experiência profissional',
    items: {
      megaDesigner: { period: 'Agosto 2025 – até o momento', role: 'UI/UX Designer', description: lorem },
      megaDirector: { period: 'Agosto 2025 – até o momento', role: 'Diretor comercial', description: lorem },
      ouronova: { period: 'Maio 2026 – até o momento', role: 'UI/UX Designer | Dev Fullstack' },
    },
  },
  projects: {
    titleStart: 'Meus ',
    titleHighlight: 'projetos',
    body: 'Alguns projetos recentes. Clique em um deles para ver as telas, o desafio e o resultado.',
    challengeLabel: 'Desafio',
    resultLabel: 'Resultado',
    viewCase: 'Ver estudo de caso',
    close: 'Fechar projeto',
    open: (title) => `Abrir o projeto ${title}`,
    screen: (title) => `Tela do projeto ${title}`,
    // TODO: descreva cada projeto. Os textos abaixo são só um guia do que escrever.
    items: {
      cop15: {
        category: 'UI/UX Design',
        summary: 'Resumo do projeto em uma ou duas frases: o que é e para quem foi feito.',
        challenge: 'Qual problema o cliente ou o usuário tinha.',
        result: 'O que mudou depois da entrega (de preferência com um número).',
      },
      acupuncture: {
        category: 'Landing page',
        summary: 'Resumo do projeto em uma ou duas frases: o que é e para quem foi feito.',
        challenge: 'Qual problema o cliente ou o usuário tinha.',
        result: 'O que mudou depois da entrega (de preferência com um número).',
      },
      wellnova: {
        category: 'Software',
        summary: 'Resumo do projeto em uma ou duas frases: o que é e para quem foi feito.',
        challenge: 'Qual problema o cliente ou o usuário tinha.',
        result: 'O que mudou depois da entrega (de preferência com um número).',
      },
    },
  },
  contact: {
    title: 'Vamos discutir o seu projeto?',
    body: 'Conte um pouco sobre a sua ideia ou projeto e vamos conversar sobre como posso ajudar.',
    emailLabel: 'Email',
    phoneLabel: 'Telefone',
    fields: { name: 'Nome', email: 'Email', location: 'Localização', project: 'Projeto', message: 'Mensagem' },
    submit: 'Enviar',
    mailSubject: (project) => `Novo projeto: ${project}`,
  },
  footer: { rights: 'Todos os direitos reservados.', backToTop: 'Voltar ao início' },
}
