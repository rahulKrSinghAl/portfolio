export const spacing = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 6,
  xxl: 8,
  section: 15,
};

export const glassEffect = {
  dark: {
    background: 'rgba(13, 20, 37, 0.6)',
    border: 'rgba(0, 212, 255, 0.08)',
    shadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
  },
  light: {
    background: 'rgba(255, 255, 255, 0.5)',
    border: 'rgba(0, 0, 0, 0.1)',
    shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  },
  blur: 'blur(24px) saturate(150%)',
};

export const animations = {
  duration: {
    fast: 0.2,
    normal: 0.35,
    slow: 0.7,
    verySlow: 1.2,
  },
  easing: {
    default: 'ease',
    smooth: [0.6, -0.05, 0.01, 0.99],
    easeOut: 'easeOut',
  },
};
