export const getProjectsStyles = (theme) => ({
  container: {
    py: { xs: theme.custom.spacing.xxl, md: theme.custom.spacing.section },
    position: 'relative',
  },
  sectionHeader: {
    mb: theme.custom.spacing.xxl,
  },
  sectionIcon: {
    color: 'primary.main',
  },
  sectionHeadingJp: {
    fontWeight: theme.custom.typography.weights.bold,
    fontFamily: theme.custom.typography.fonts.secondary,
  },
  sectionHeadingEn: {
    fontWeight: theme.custom.typography.weights.bold,
    color: 'text.secondary',
  },
  card: {
    height: '100%',
    border: '1px solid',
    borderColor: theme.palette.glass.border,
    borderRadius: 0,
    background: theme.palette.glass.background,
    backdropFilter: theme.custom.glassEffect.blur,
    WebkitBackdropFilter: theme.custom.glassEffect.blur,
    boxShadow: theme.palette.glass.shadow,
    transition: `border-color ${theme.custom.animations.duration.normal}s ${theme.custom.animations.easing.default}, box-shadow ${theme.custom.animations.duration.normal}s ${theme.custom.animations.easing.default}`,
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      borderColor: 'primary.main',
      boxShadow: `0 12px 40px ${theme.custom.glow.primaryGlow(0.25)}`,
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 4,
      background: theme.palette.gradient.secondary,
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transition: `transform ${theme.custom.animations.duration.normal}s ${theme.custom.animations.easing.default}`,
    },
    '&:hover::before': {
      transform: 'scaleX(1)',
    },
  },
  cardContent: {
    p: { xs: theme.custom.spacing.md, md: theme.custom.spacing.lg },
  },
  projectTitle: {
    fontWeight: theme.custom.typography.weights.semiBold,
    flex: 1,
  },
  teamChip: {
    bgcolor: 'secondary.main',
    color: 'white',
    fontWeight: theme.custom.typography.weights.medium,
    borderRadius: 0,
  },
  roleChip: {
    bgcolor: 'primary.main',
    color: 'white',
    borderRadius: 0,
  },
  periodChip: {
    borderColor: 'primary.main',
    color: 'primary.main',
    borderRadius: 0,
    borderWidth: 2,
  },
  projectDescription: {
    mb: theme.custom.spacing.md,
    fontStyle: 'italic',
    lineHeight: 1.7,
  },
  bulletDot: {
    width: 6,
    height: 6,
    bgcolor: 'primary.main',
    mt: 1,
    flexShrink: 0,
  },
  achievementText: {
    lineHeight: 1.7,
  },
});
