import type { Dictionary } from './types'

const serviceTags = ['UI/UX', 'Figma', 'Prototyping']

export const en: Dictionary = {
  meta: {
    description: 'Luís Eduardo — UI/UX Designer, Product Designer and Fullstack Developer.',
  },
  nav: {
    label: 'Main',
    cta: "Let's talk",
    inicio: 'Home',
    sobre: 'About',
    servicos: 'Services',
    experiencia: 'Resume',
    projetos: 'Projects',
    contato: 'Contact',
  },
  controls: {
    language: 'Language',
    toDark: 'Switch to dark mode',
    toLight: 'Switch to light mode',
  },
  hero: {
    badgeName: 'Luís Eduardo',
    badgeRole: 'UI/UX Designer & Fullstack Developer',
    titleStart: 'Where great design meets ',
    titleHighlight: 'clean code.',
    support: 'I help startups and businesses build web and mobile products, from prototype to deploy.',
    primaryCta: "Let's work together",
    secondaryCta: 'See my work',
    photoAlt: 'Photo of Luís Eduardo',
  },
  services: {
    titleLines: ['How I help', 'you grow?'],
    cta: 'Start a project',
    expand: (title) => `See details of ${title}`,
    collapse: (title) => `Collapse ${title}`,
    flowLabel: 'How an automation works',
    items: [
      {
        number: '01',
        title: 'AI & automation',
        tags: serviceTags,
        description: 'Focused on automating processes, improving productivity and generating value and more conversion!',
        details: [
          'AI agents and chatbots for support, sales and customer service',
          'Automation of repetitive tasks and workflows across tools',
          'System integrations through APIs and webhooks',
          'Reports and dashboards that update themselves',
        ],
        cta: 'Automate my business',
        flow: [
          { label: 'Trigger', detail: 'Message, form or event' },
          { label: 'AI agent', detail: 'Understands, decides and replies' },
          { label: 'Action', detail: 'Updates CRM, sheet or replies' },
        ],
      },
      {
        number: '02',
        title: 'Product Design',
        tags: serviceTags,
        description: 'Focused on product thinking that converts and sparks interest in the audience.',
        details: [
          'Problem discovery with real users',
          'Information architecture and user flows',
          'Usability testing and continuous iteration',
          'Metrics to validate every design decision',
        ],
        cta: 'Design my product',
      },
      {
        number: '03',
        title: 'UI/UX Design',
        tags: serviceTags,
        description: 'Focused on design psychology and layouts that convert.',
        details: [
          'Wireframes and clickable prototypes in Figma',
          'Consistent interfaces built on a design system',
          'Responsive layouts focused on conversion',
          'Organized handoff for the development team',
        ],
        cta: 'Improve my interface',
      },
      {
        number: '04',
        title: 'Development',
        tags: serviceTags,
        description: 'Focused on developing applications, e-commerce, landing pages and apps.',
        details: [
          'Fast, responsive websites and landing pages',
          'Fullstack web apps: front-end, APIs and databases',
          'Deployment, technical SEO and performance tuning',
          'Ongoing maintenance and product evolution',
        ],
        cta: 'Build my website',
      },
    ],
  },
  about: {
    title: 'About',
    body: "Graduating in Computer Science at UFMS, I'm a student and professional who always seeks to challenge myself and do new things, passionate about UI/UX Design and Product Design, I always try to seek out and deliver the best work possible.",
  },
  experience: {
    title: 'My professional experience',
    periods: {
      megaJr: 'August 2025 – present',
      ouronova: 'August 2025 – present',
    },
    items: {
      megaDesigner: {
        role: 'UI/UX Designer',
        description:
          'Worked as a UI/UX Designer on several projects, such as: COP-15, a landing page for an acupuncturist and a junior enterprise (Multipla',
      },
      megaDirector: {
        role: 'Commercial Director',
        description:
          'Handled the management of sales processes, conversations with leads, closing contracts and meetings to convert leads.',
      },
      megaDev: {
        role: 'Web Dev.',
        description:
          'Worked as a web developer on landing pages for different niches, such as corporate and healthcare.',
      },
      ouronova: {
        role: 'UI/UX Designer & Dev.',
        description:
          'Worked on the design and redesign of flows for the Wellnova software for companies in the oil sector, such as Petrobras, Shell and European companies.',
      },
    },
  },
  projects: {
    titleStart: 'My ',
    titleHighlight: 'projects',
    body: 'Projects by category. Open one and use the arrows to browse each project.',
    challengeLabel: 'Challenge',
    resultLabel: 'Result',
    viewCase: 'View project',
    close: 'Close project',
    open: (title) => `Open ${title}`,
    categories: { landing: 'Landing page', uiux: 'UI/UX', software: 'Software' },
    count: (total) => (total === 1 ? '1 project' : `${total} projects`),
    previous: 'Previous project',
    next: 'Next project',
    screen: (title) => `Screen from the ${title} project`,
    // TODO: fill in the challenge and the result of each project (the texts below are only a guide).
    items: {
      garanhani: {
        summary:
          "Landing page for Dr. Rafael Garanhani's practice: medical acupuncture, neuromodulation, homeopathy and general care.",
        challenge: 'The problem the client or the users had.',
        result: 'What changed after delivery (ideally with a number).',
      },
      wellnova: {
        summary:
          "Wellnova's public website, an AI platform for oil and gas well integrity. I worked on refactoring the code.",
        challenge: 'The problem the client or the users had.',
        result: 'What changed after delivery (ideally with a number).',
      },
      ironCapi: {
        summary:
          'Iron Capi workout app: workout of the day, weekly streak, friends ranking and a training calendar, plus the team dashboard.',
        challenge: 'The problem the client or the users had.',
        result: 'What changed after delivery (ideally with a number).',
      },
      wellnovaApp: {
        summary:
          "Wellnova's AI platform for oil and gas well integrity. I worked on the redesign of a specific module of the system.",
        challenge: 'The problem the client or the users had.',
        result: 'What changed after delivery (ideally with a number).',
      },
      megaAtas: {
        summary:
          "Mega Jr.'s meeting minutes generator: it takes the details, the date and the key points and writes the summary. My first project with JavaScript and APIs.",
        challenge: 'The problem the client or the users had.',
        result: 'What changed after delivery (ideally with a number).',
      },
    },
  },
  contact: {
    title: "Let's talk about your project",
    body: "Tell me a bit about your idea or project and let's talk about how I can help.",
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    fields: { name: 'Name', email: 'Email', location: 'Location', project: 'Project', message: 'Message' },
    submit: 'Send',
    mailSubject: (project) => `New project: ${project}`,
  },
  footer: { rights: 'All rights reserved.', backToTop: 'Back to top' },
}
