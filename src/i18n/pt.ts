import type { Dictionary } from './types'

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
        title: 'IA & automatizações',
        tags: serviceTags,
        description: 'Focado em automatizar processos, melhorar produtividade e gerar valor e mais conversão!',
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
        description: 'Focado em pensamento de produtos que convertem e geram interesse no público.',
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
        description: 'Focado em psicologia do design e layouts que convertem.',
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
        title: 'Desenvolvimento',
        tags: serviceTags,
        description: 'Focado em desenvolvimento de aplicações, E-commerces, landing-pages e aplicativos.',
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
    body: 'Formando em Ciência da Computação pela UFMS, sou um estudante e profissional que sempre busco me desafiar e realizar coisas novas, apaixonado por UI/UX Design e Design de Produto, tento sempre procurar e realizar o melhor trabalho possível.',
  },
  experience: {
    title: 'Minha experiência profissional',
    periods: {
      megaJr: 'Agosto 2025 – até o momento',
      ouronova: 'Agosto 2025 – até o momento',
    },
    items: {
      megaDesigner: {
        role: 'UI/UX Designer',
        description:
          'Atuei como UI/UX Designer em diversos projetos tais como: COP-15, landing page de Acunpunpulturista e empresa Jr. (Multipla',
      },
      megaDirector: {
        role: 'Diretor comercial',
        description:
          'Lidei com a gestão de processos comerciais, conversas com leads, realização de contratos e reuniões para conversão de leads.',
      },
      megaDev: {
        role: 'Dev. Web',
        description:
          'Atuei como desenvolvedor Web em landing pages de diferentes nichos, tais como empresarais e da área da saúde.',
      },
      ouronova: {
        role: 'UI/UX Designer e Dev.',
        description:
          'Atuei na elaboração E Redesign de fluxos do software wellnova para empresas do setor petrolífero, tais como: Petrobrás, Shell e empresas europeias.',
      },
    },
  },
  projects: {
    titleStart: 'Meus ',
    titleHighlight: 'projetos',
    body: 'Projetos por categoria. Abra uma delas e use as setas para ver cada projeto.',
    challengeLabel: 'Desafio',
    resultLabel: 'Resultado',
    viewCase: 'Ver projeto',
    close: 'Fechar projeto',
    open: (title) => `Abrir ${title}`,
    categories: { landing: 'Landing page', uiux: 'UI/UX', software: 'Software' },
    count: (total) => (total === 1 ? '1 projeto' : `${total} projetos`),
    previous: 'Projeto anterior',
    next: 'Próximo projeto',
    screen: (title) => `Tela do projeto ${title}`,
    // TODO: complete o desafio e o resultado de cada projeto (os textos abaixo são só um guia).
    items: {
      garanhani: {
        summary:
          'Landing page do consultório do Dr. Rafael Garanhani: acupuntura médica, neuromodulação, homeopatia e clínica geral.',
        challenge: 'Qual problema o cliente ou o usuário tinha.',
        result: 'O que mudou depois da entrega (de preferência com um número).',
      },
      wellnova: {
        summary:
          'Hotsite público da Wellnova, plataforma de IA para integridade de poços de óleo e gás. Atuei na refatoração do código.',
        challenge: 'Qual problema o cliente ou o usuário tinha.',
        result: 'O que mudou depois da entrega (de preferência com um número).',
      },
      ironCapi: {
        summary:
          'App de treino Iron Capi: treino do dia, sequência semanal, ranking com amigos e calendário de treinos, além do painel do time.',
        challenge: 'Qual problema o cliente ou o usuário tinha.',
        result: 'O que mudou depois da entrega (de preferência com um número).',
      },
      wellnovaApp: {
        summary:
          'Plataforma de IA da Wellnova para integridade de poços de óleo e gás. Atuei no redesign de um módulo específico do sistema.',
        challenge: 'Qual problema o cliente ou o usuário tinha.',
        result: 'O que mudou depois da entrega (de preferência com um número).',
      },
      megaAtas: {
        summary:
          'Gerador de atas de reunião da Mega Jr.: recebe os detalhes, a data e os pontos importantes e gera o resumo. Meu primeiro projeto com JavaScript e APIs.',
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
