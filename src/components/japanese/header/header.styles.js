export const getHeaderStyles = (theme) => ({
  appBar: {
    borderBottom: '2px solid',
    borderColor: 'divider',
    backdropFilter: theme.custom.glassEffect.blur,
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(0, 0, 0, 0.9)'
      : 'rgba(255, 255, 255, 0.9)',
  },
  toolbar: {
    justifyContent: 'space-between',
    py: 1.5,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    cursor: 'pointer',
    transition: `transform ${theme.custom.animations.duration.normal}s ${theme.custom.animations.easing.default}`,
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  logoImage: {
    width: 45,
    height: 45,
    filter: theme.palette.mode === 'dark'
      ? `drop-shadow(0 0 8px ${theme.custom.glow.primaryGlow(0.3)})`
      : 'none',
  },
  logoTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0.2,
  },
  logoText: {
    fontWeight: theme.custom.typography.weights.bold,
    fontFamily: theme.custom.typography.fonts.secondary,
    background: theme.palette.gradient.primary,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: theme.custom.typography.spacing.extraLoose,
    lineHeight: 1,
  },
  logoSubtext: {
    fontFamily: theme.custom.typography.fonts.fallback,
    color: 'text.secondary',
    opacity: 0.6,
    letterSpacing: '0.2em',
  },
  navButton: {
    color: 'text.primary',
    fontWeight: theme.custom.typography.weights.regular,
    textTransform: 'none',
    px: theme.custom.spacing.sm,
    py: theme.custom.spacing.xs,
    borderRadius: 0,
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '2px',
      background: theme.palette.gradient.secondary,
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transition: `transform ${theme.custom.animations.duration.normal}s ${theme.custom.animations.easing.default}`,
    },
    '&:hover': {
      color: 'primary.main',
      bgcolor: 'transparent',
      '&::after': {
        transform: 'scaleX(1)',
      },
    },
    transition: `color ${theme.custom.animations.duration.fast}s ${theme.custom.animations.easing.default}`,
  },
  navButtonJp: {
    opacity: 0.5,
    fontFamily: theme.custom.typography.fonts.fallback,
  },
  themeToggle: {
    color: 'text.primary',
    border: '2px solid',
    borderColor: 'divider',
    borderRadius: 0,
    width: 40,
    height: 40,
    transition: `all ${theme.custom.animations.duration.normal}s ${theme.custom.animations.easing.default}`,
    '&:hover': {
      borderColor: 'primary.main',
      color: 'primary.main',
      transform: 'rotate(180deg)',
    },
  },
});
