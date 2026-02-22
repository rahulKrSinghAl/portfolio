export const getExperienceStyles = (theme) => ({
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
  timelineLine: {
    position: 'absolute',
    left: { xs: 8, md: 20 },
    top: 40,
    width: 2,
    bgcolor: 'primary.main',
    opacity: 0.3,
    display: { xs: 'none', sm: 'block' },
  },
  card: {
    border: '1px solid',
    borderColor: theme.palette.glass.border,
    borderRadius: 0,
    position: 'relative',
    ml: { xs: 0, sm: theme.custom.spacing.xl },
    background: theme.palette.glass.background,
    backdropFilter: theme.custom.glassEffect.blur,
    WebkitBackdropFilter: theme.custom.glassEffect.blur,
    boxShadow: theme.palette.glass.shadow,
    transition: `border-color ${theme.custom.animations.duration.normal}s ${theme.custom.animations.easing.default}, box-shadow ${theme.custom.animations.duration.normal}s ${theme.custom.animations.easing.default}`,
    '&:hover': {
      borderColor: 'primary.main',
      boxShadow: `0 12px 40px ${theme.custom.glow.primaryGlow(0.25)}`,
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      left: { xs: -24, sm: -30 },
      top: 40,
      width: 12,
      height: 12,
      bgcolor: 'primary.main',
      border: '3px solid',
      borderColor: 'background.default',
      display: { xs: 'none', sm: 'block' },
    },
  },
  cardContent: {
    p: { xs: theme.custom.spacing.md, md: theme.custom.spacing.lg },
  },
  cardHeader: {
    mb: theme.custom.spacing.sm,
  },
  jobTitle: {
    fontWeight: theme.custom.typography.weights.semiBold,
    mb: 0.5,
  },
  companyName: {
    fontWeight: theme.custom.typography.weights.medium,
  },
  periodChip: {
    bgcolor: 'primary.main',
    color: 'white',
    fontWeight: theme.custom.typography.weights.medium,
    px: theme.custom.spacing.xs,
    borderRadius: 0,
  },
  jobType: {
    mb: theme.custom.spacing.md,
    fontStyle: 'italic',
  },
  bulletDot: {
    width: 6,
    height: 6,
    bgcolor: 'primary.main',
    mt: 1,
    flexShrink: 0,
  },
});
