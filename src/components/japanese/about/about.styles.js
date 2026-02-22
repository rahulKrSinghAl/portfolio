export const getAboutStyles = (theme) => ({
  container: {
    py: { xs: theme.custom.spacing.xxl, md: theme.custom.spacing.section },
    position: 'relative',
  },
  sectionHeader: {
    mb: theme.custom.spacing.xxl,
    textAlign: 'center',
  },
  sectionLabel: {
    color: 'primary.main',
    fontWeight: theme.custom.typography.weights.medium,
    mb: theme.custom.spacing.xs,
    letterSpacing: theme.custom.typography.spacing.extraLoose,
    textTransform: 'uppercase',
  },
  sectionIcon: {
    mr: theme.custom.spacing.xs,
    verticalAlign: 'middle',
  },
  mainHeading: {
    mb: theme.custom.spacing.sm,
    position: 'relative',
    display: 'inline-block',
    fontFamily: theme.custom.typography.fonts.secondary,
  },
  headingEnglish: {
    ml: theme.custom.spacing.sm,
    color: 'text.primary',
  },
  summaryText: {
    lineHeight: 1.8,
    color: 'text.secondary',
    mb: theme.custom.spacing.lg,
  },
  experienceWrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  experienceBox: {
    textAlign: 'center',
    p: theme.custom.spacing.lg,
    borderRadius: 0,
    background: theme.palette.glass.background,
    border: '1px solid',
    borderColor: theme.palette.glass.border,
    backdropFilter: theme.custom.glassEffect.blur,
    WebkitBackdropFilter: theme.custom.glassEffect.blur,
    boxShadow: theme.palette.glass.shadow,
  },
  experienceNumber: {
    fontWeight: theme.custom.typography.weights.bold,
    background: theme.palette.gradient.primary,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    mb: theme.custom.spacing.xs,
  },
  experienceLabel: {
    color: 'text.secondary',
    fontWeight: theme.custom.typography.weights.regular,
    fontFamily: theme.custom.typography.fonts.fallback,
  },
  experienceSublabel: {
    color: 'text.secondary',
  },
  strengthCard: {
    height: '100%',
    background: theme.palette.glass.background,
    border: '1px solid',
    borderColor: theme.palette.glass.border,
    borderRadius: 0,
    backdropFilter: theme.custom.glassEffect.blur,
    WebkitBackdropFilter: theme.custom.glassEffect.blur,
    boxShadow: theme.palette.glass.shadow,
    transition: `border-color ${theme.custom.animations.duration.normal}s ${theme.custom.animations.easing.default}, box-shadow ${theme.custom.animations.duration.normal}s ${theme.custom.animations.easing.default}`,
    '&:hover': {
      borderColor: 'primary.main',
      boxShadow: `0 8px 32px ${theme.custom.glow.primaryGlow(0.3)}`,
    },
  },
  strengthCardContent: {
    p: theme.custom.spacing.lg,
  },
  strengthIconRow: {
    display: 'flex',
    alignItems: 'center',
    mb: theme.custom.spacing.sm,
  },
  strengthIcon: {
    color: 'primary.main',
    mr: theme.custom.spacing.sm,
  },
  strengthTitle: {
    fontWeight: theme.custom.typography.weights.semiBold,
    color: 'primary.main',
  },
  strengthDescription: {
    color: 'text.secondary',
    lineHeight: 1.8,
  },
});
