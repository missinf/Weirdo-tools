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
    empty: 'You haven\'t saved any tools yet. Browse the Tools page and save your favorites for quick access.',
    noSavedTitle: 'No saved tools yet',
    placeholder: 'Your saved tools will appear here',
  },
  help: {
    title: 'Help',
    feedback: {
      short: 'Feedback',
      full: 'Give me feedback',
      tooltip: 'Share feedback on Discord',
    },
    about: {
      title: 'What is Weirdo Tools?',
      description: 'Weirdo Tools is a free collection of lightweight, easy-to-use tools designed specifically for people with ADHD. All your data is stored locally in your browser - no login required.',
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
          question: 'Is my data private?',
          answer: 'Yes. All data is stored locally in your browser- I don\'t save or access any of it. When AI features are used, only the information you submit is sent to the AI provider. For more details, see',
          link: {
            text: 'Privacy Policy',
            url: 'https://www.adhdweirdo.com/privacy.html',
          },
        },
        {
          question: 'Is my data saved?',
          answer: 'Yes. All your progress and preferences are saved locally in your browser. Just don/t clear your browser data!',
        },
        {
          question: 'How can I share ideas or suggestions?',
          answer: 'Join our Discord community to share ideas, suggestions, or feedback. Click the "Give me feedback" button at the top of this page.',
        },
      ],
    },
    credits: {
      title: 'Credits',
      description: 'Thank you to all our Patreon supporters who make this project possible!',
      patreon: {
        button: 'Support on Patreon',
        tooltip: 'Support creators on Patreon',
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
