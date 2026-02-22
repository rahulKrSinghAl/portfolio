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
    background: 'rgba(18, 18, 26, 0.75)',
    border: 'rgba(0, 240, 255, 0.1)',
    shadow: '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
  },
  light: {
    background: 'rgba(240, 240, 245, 0.7)',
    border: 'rgba(176, 38, 255, 0.1)',
    shadow: '0 8px 32px 0 rgba(26, 26, 46, 0.1)',
  },
  blur: 'blur(16px) saturate(150%)',
};

export const animations = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    verySlow: 1.0,
  },
  easing: {
    default: 'ease',
    smooth: [0.4, 0, 0.2, 1],
    easeOut: 'easeOut',
    glitch: [0.68, -0.55, 0.27, 1.55],
  },
};
