// Centralized copy for internationalization
export const copy = {
  app: {
    title: 'Weirdo Tools',
    tagline: 'Free ADHD Tools',
  },
  nav: {
    tools: 'Tools',
    saved: 'Saved',
    help: 'Help',
    settings: 'Settings',
  },
  tools: {
    banner: {
      welcome: 'Welcome!',
      description: 'These are small tools made to help with ADHD.',
      dismiss: 'Got it',
    },
    comingSoon: 'Coming Soon',
    feedback: 'Give me feedback',
    donate: 'Donate',
    popular: 'Popular',
    categories: {
      focus: 'Focus',
      organization: 'Organization',
      time: 'Time Management',
      memory: 'Memory',
      creativity: 'Creativity',
      wellness: 'Wellness',
    },
    placeholderTool: 'Tool Placeholder',
  },
  saved: {
    title: 'Saved Tools',
    emptyTitle: 'Nothing saved yet!',
    emptyDescription: 'Find a tool you like? Just click the bookmark icon to save it here',
  },
  help: {
    title: 'Help',
    feedback: {
      short: 'Feedback',
      full: 'Give me feedback',
    },
    about: {
      title: 'What is Weirdo Tools?',
      description: 'Weirdo Tools is a free collection of small tools made for ADHDers.',
    },
    howTo: {
      title: 'How to use the app',
      steps: [
        'Browse the Tools page to explore different categories',
        'Click on any tool to start using it',
        'Save tools you like for quick access from the Saved page',
        'All your progress and preferences are saved automatically',
      ],
    },
    faq: {
      title: 'FAQ',
      items: [
        {
          question: 'Something wrong or have an idea?',
          answer: 'Join our Discord community to share ideas or report bugs. Click the "Feedback" button at the top of this page.',
        },
        {
          question: 'Is my data private?',
          answer: 'Yes. Your data is yours- I don\'t save or see of it. When AI features are used, only the information you submit is sent to the AI provider. For more details, see',
          link: {
            text: 'Privacy Policy',
            url: 'https://www.adhdweirdo.com/privacy.html',
          },
        },
        {
          question: 'Can I back up my data?',
          answer: "Right now, everything is saved locally in your browser, so just don't clear your browser data! I'll look into adding a backup feature if enough people want it.",
        },
      ],
    },
    credits: {
      title: 'Credits',
      description: 'Thank you to all our Patreon supporters who make this project possible!',
      patreon: {
        button: 'Support on Patreon',
      },
      patreonLink: 'https://www.patreon.com/cw/ADHD_weirdo_',
      discordLink: 'https://discord.gg/PVc4jRC5tE',
    },
  },
  settings: {
    title: 'Settings',
    placeholder: 'Settings coming soon',
    appearance: {
      title: 'Appearance',
      description: 'Customize how Weirdo Tools looks',
      darkMode: {
        label: 'Dark mode',
        description: 'Toggle between light and dark themes',
        tooltip: 'Toggle dark mode',
      },
    },
  },
  search: {
    placeholder: 'Search',
    tooltip: 'Search',
    voice: {
      tooltip: 'Search by voice',
      unsupported: 'Voice search is not supported in your browser. Please try Chrome, Edge, or Safari.',
      title: 'Voice Search',
      description: 'Speak your search query. Tap the microphone to start or stop recording.',
      listening: 'Listening...',
      tryAgain: 'Didn\'t hear that, try again.',
      tapToRetry: 'Tap microphone to try again',
    },
  },
  navigation: {
    menuTooltip: 'Open navigation menu',
  },
} as const;
