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
    background: 'rgba(44, 31, 14, 0.7)',
    border: 'rgba(196, 163, 90, 0.12)',
    shadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
  },
  light: {
    background: 'rgba(250, 246, 238, 0.6)',
    border: 'rgba(139, 105, 20, 0.12)',
    shadow: '0 8px 32px 0 rgba(92, 68, 9, 0.1)',
  },
  blur: 'blur(12px) saturate(120%)',
};

export const animations = {
  duration: {
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
    verySlow: 1.5,
  },
  easing: {
    default: 'ease',
    smooth: [0.4, 0, 0.2, 1],
    easeOut: 'easeOut',
    inkSpread: [0.25, 0.46, 0.45, 0.94],
  },
};
