// Design tokens for non-color elements
export const config = {
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '1rem',      // 16px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '3rem',      // 48px
  },
  durations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  navigation: {
    // < 768px: bottom navbar
    // 768px - 1024px: collapsed rail (modal when expanded)
    // >= 1024px: expanded rail (can collapse)
    bottomNavBreakpoint: '768px',
    expandedRailBreakpoint: '1024px',
    collapsedWidth: '72px',
    expandedWidth: '256px',
    topBarHeight: '64px',
  },
  tapTarget: {
    minSize: '44px',
  },
  typography: {
    maxLineLength: '75ch',
    minFontSize: '16px',
    lineHeight: 1.5,
  },
  voiceRecording: {
    silenceTimeout: 500, // milliseconds of silence before auto-stopping
    initialDelay: 3000, // milliseconds to wait before starting silence detection
  },
} as const;
