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
      title: 'Welcome to Weirdo Tools!',
      description: 'A collection of small tools made to help with ADHD.',
      dismiss: 'Got it',
    },
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
  },
  help: {
    title: 'Help',
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
          question: 'Do I need to create an account?',
          answer: 'No! Everything is stored locally in your browser. No login required.',
        },
        {
          question: 'Is my data private?',
          answer: 'Yes. All data is stored locally on your device. Nothing is sent to any server.',
        },
        {
          question: 'Can I use this on mobile?',
          answer: 'Absolutely! Weirdo Tools is designed to work on all devices.',
        },
      ],
    },
    credits: {
      title: 'Credits & Support',
      description: 'Thank you to all our Patreon supporters who make this project possible!',
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
      },
    },
  },
} as const;
