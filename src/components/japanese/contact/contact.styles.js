export const getContactStyles = (theme) => ({
  container: {
    py: { xs: theme.custom.spacing.xxl, md: theme.custom.spacing.section },
    position: 'relative',
  },
  decorativeOverlay: {
    opacity: 0.3,
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
  contactCard: {
    p: { xs: theme.custom.spacing.lg, md: theme.custom.spacing.xl },
    border: '1px solid',
    borderColor: theme.palette.glass.border,
    borderRadius: 0,
    textAlign: 'center',
    background: theme.palette.glass.background,
    backdropFilter: theme.custom.glassEffect.blur,
    WebkitBackdropFilter: theme.custom.glassEffect.blur,
    boxShadow: theme.palette.glass.shadow,
    mb: theme.custom.spacing.xl,
  },
  contactTitle: {
    fontWeight: theme.custom.typography.weights.semiBold,
    mb: theme.custom.spacing.lg,
  },
  contactInfoIcon: {
    color: 'primary.main',
  },
  contactInfoLabel: {
    fontWeight: theme.custom.typography.weights.medium,
  },
  contactInfoValue: {
    wordBreak: 'break-word',
  },
  socialButton: {
    bgcolor: 'primary.main',
    color: 'white',
    width: 56,
    height: 56,
    borderRadius: 0,
    '&:hover': {
      bgcolor: 'primary.dark',
    },
    transition: `background-color ${theme.custom.animations.duration.fast}s ${theme.custom.animations.easing.default}`,
  },
  glassCard: {
    p: { xs: theme.custom.spacing.md, md: theme.custom.spacing.lg },
    height: '100%',
    border: '1px solid',
    borderColor: theme.palette.glass.border,
    borderRadius: 0,
    background: theme.palette.glass.background,
    backdropFilter: theme.custom.glassEffect.blur,
    WebkitBackdropFilter: theme.custom.glassEffect.blur,
    boxShadow: theme.palette.glass.shadow,
    transition: `border-color ${theme.custom.animations.duration.normal}s ${theme.custom.animations.easing.default}, box-shadow ${theme.custom.animations.duration.normal}s ${theme.custom.animations.easing.default}`,
  },
  educationCard: {
    '&:hover': {
      borderColor: 'primary.main',
      boxShadow: `0 8px 32px ${theme.custom.glow.primaryGlow(0.2)}`,
    },
  },
  achievementsCard: {
    '&:hover': {
      borderColor: 'secondary.main',
      boxShadow: `0 8px 32px ${theme.custom.glow.secondaryGlow(0.2)}`,
    },
  },
  cardSectionHeader: {
    mb: theme.custom.spacing.md,
  },
  cardSectionIcon: {
    color: 'primary.main',
  },
  achievementsIcon: {
    color: 'secondary.main',
  },
  cardSectionTitle: {
    fontWeight: theme.custom.typography.weights.semiBold,
  },
  educationDegree: {
    fontWeight: theme.custom.typography.weights.medium,
  },
  achievementTitle: {
    fontWeight: theme.custom.typography.weights.medium,
    mb: theme.custom.spacing.xs,
  },
  achievementDescription: {
    lineHeight: 1.7,
  },
});
