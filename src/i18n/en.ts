import type { Dictionary } from './types'

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacus nunc, posuere in justo vulputate, bibendum sodales.'
const serviceDescription = 'Focused on design psychology and layouts that convert.'
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
        description: serviceDescription,
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
        description: serviceDescription,
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
        description: serviceDescription,
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
        title: 'Web Dev.',
        tags: serviceTags,
        description: serviceDescription,
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
    body: 'Nisl arcu, scelerisque neque ut. Tincidunt amet, tempor duis tortor neque auctor dis ipsum. Pretium cras amet odio amet eleifend id sed cras sed. Aliquet risus posuere aliquet imperdiet sit.',
  },
  experience: {
    title: 'My professional experience',
    items: {
      megaDesigner: { period: 'August 2025 – present', role: 'UI/UX Designer', description: lorem },
      megaDirector: { period: 'August 2025 – present', role: 'Commercial Director', description: lorem },
      ouronova: { period: 'May 2026 – present', role: 'UI/UX Designer | Fullstack Dev' },
    },
  },
  projects: {
    titleStart: 'My ',
    titleHighlight: 'projects',
    body: 'A few recent projects. Click one to see the screens, the challenge and the result.',
    challengeLabel: 'Challenge',
    resultLabel: 'Result',
    viewCase: 'View case study',
    close: 'Close project',
    open: (title) => `Open the ${title} project`,
    screen: (title) => `Screen from the ${title} project`,
    // TODO: describe each project. The texts below are only a guide.
    items: {
      cop15: {
        category: 'UI/UX Design',
        summary: 'One or two sentences about the project: what it is and who it was built for.',
        challenge: 'The problem the client or the users had.',
        result: 'What changed after delivery (ideally with a number).',
      },
      acupuncture: {
        category: 'Landing page',
        summary: 'One or two sentences about the project: what it is and who it was built for.',
        challenge: 'The problem the client or the users had.',
        result: 'What changed after delivery (ideally with a number).',
      },
      wellnova: {
        category: 'Software',
        summary: 'One or two sentences about the project: what it is and who it was built for.',
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
