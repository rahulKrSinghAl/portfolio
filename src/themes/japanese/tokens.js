export const spacing = {
  xs: 1,    // 8px
  sm: 2,    // 16px
  md: 3,    // 24px
  lg: 4,    // 32px
  xl: 6,    // 48px
  xxl: 8,   // 64px
  section: 15, // 120px
};

export const glassEffect = {
  dark: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: 'rgba(255, 255, 255, 0.1)',
    shadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  },
  light: {
    background: 'rgba(255, 255, 255, 0.5)',
    border: 'rgba(0, 0, 0, 0.1)',
    shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  },
  blur: 'blur(20px) saturate(180%)',
};

export const animations = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.6,
    verySlow: 1,
  },
  easing: {
    default: 'ease',
    smooth: [0.6, -0.05, 0.01, 0.99],
    easeOut: 'easeOut',
  },
};
