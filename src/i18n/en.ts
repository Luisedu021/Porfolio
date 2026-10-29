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
    educacao: 'Education',
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
    body: "I'm Luís Eduardo, a designer and developer studying Computer Science at UFMS. I work where design meets code: I understand the problem and the people who will use it, design the interface in Figma and take it all the way to a live product. Today I work as a UI/UX Designer and developer at Ouronova and at Mega Jr., where I've also done development and sales. I enjoy new challenges and delivering solid work, from the first sketch to deploy.",
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
  education: {
    title: 'Education',
    status: 'In progress',
    degree: "Bachelor's in Computer Science",
    institution: 'Federal University of Mato Grosso do Sul',
    progress: (year, total) => `Year ${year} of ${total}`,
    start: 'Start',
    now: 'Now',
    graduation: 'Graduation',
    language: {
      status: 'Certified',
      title: 'Fluent English',
      exam: 'Cambridge B2 First (FCE)',
      result: 'Certified at C1 level',
      scale: 'Level C1 of C2',
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
  },
  contact: {
    title: "Let's talk about your project",
    body: "Tell me a bit about your idea or project and let's talk about how I can help.",
    emailLabel: 'Email',
    whatsappLabel: 'WhatsApp',
    whatsappMessage: "Hi, Luís! I saw your portfolio and I'd like to talk about a project.",
    fields: {
      name: 'Name',
      email: 'Email',
      phone: 'WhatsApp (with country code)',
      location: 'Location',
      project: 'Project',
      message: 'Message',
    },
    submit: 'Send',
    sending: 'Sending...',
    sent: "Message sent! I'll get back to you soon.",
    failed: "Couldn't send it right now. Try again or email me.",
    mailSubject: (project) => `New project: ${project}`,
  },
  footer: { rights: 'All rights reserved.', backToTop: 'Back to top' },
}
