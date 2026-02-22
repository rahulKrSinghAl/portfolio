export const getSkillsStyles = (theme) => ({
  container: {
    py: { xs: theme.custom.spacing.xxl, md: theme.custom.spacing.section },
    position: 'relative',
  },
  decorativeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4,
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
  frontendCard: {
    '&:hover': {
      borderColor: 'primary.main',
      boxShadow: `0 8px 32px ${theme.custom.glow.primaryGlow(0.2)}`,
    },
  },
  languagesCard: {
    '&:hover': {
      borderColor: 'secondary.main',
      boxShadow: `0 8px 32px ${theme.custom.glow.secondaryGlow(0.2)}`,
    },
  },
  spokenLanguagesCard: {
    '&:hover': {
      boxShadow: `0 8px 32px ${theme.custom.glow.primaryGlow(0.15)}`,
    },
  },
  cardTitle: {
    fontWeight: theme.custom.typography.weights.semiBold,
    mb: theme.custom.spacing.md,
  },
  cardTitleIcon: {
    mr: theme.custom.spacing.xs,
    verticalAlign: 'middle',
    color: 'primary.main',
  },
  languageSectionHeader: {
    mb: theme.custom.spacing.md,
  },
  languageIcon: {
    color: 'primary.main',
  },
  chipPrimary: {
    py: 2.5,
    px: theme.custom.spacing.xs,
    borderRadius: 0,
    fontWeight: theme.custom.typography.weights.medium,
    cursor: 'default',
    bgcolor: theme.palette.mode === 'dark'
      ? theme.custom.glow.primaryGlow(0.1)
      : theme.custom.glow.primaryGlow(0.08),
    color: 'primary.main',
    border: '2px solid',
    borderColor: 'primary.main',
    '& .MuiChip-icon': {
      color: 'inherit',
    },
    '&:hover': {
      bgcolor: 'primary.main',
      color: 'white',
    },
    transition: `background-color ${theme.custom.animations.duration.fast}s ${theme.custom.animations.easing.default}, color ${theme.custom.animations.duration.fast}s ${theme.custom.animations.easing.default}`,
  },
  chipSecondary: {
    py: 2.5,
    px: theme.custom.spacing.xs,
    borderRadius: 0,
    fontWeight: theme.custom.typography.weights.medium,
    cursor: 'default',
    bgcolor: theme.palette.mode === 'dark'
      ? theme.custom.glow.secondaryGlow(0.1)
      : theme.custom.glow.secondaryGlow(0.15),
    color: 'secondary.main',
    border: '2px solid',
    borderColor: 'secondary.main',
    '& .MuiChip-icon': {
      color: 'inherit',
    },
    '&:hover': {
      bgcolor: 'secondary.main',
      color: 'white',
    },
    transition: `background-color ${theme.custom.animations.duration.fast}s ${theme.custom.animations.easing.default}, color ${theme.custom.animations.duration.fast}s ${theme.custom.animations.easing.default}`,
  },
  languageBarName: {
    fontWeight: theme.custom.typography.weights.medium,
  },
  languageBarTrack: {
    width: '100%',
    height: 8,
    bgcolor: 'divider',
    borderRadius: 0,
    overflow: 'hidden',
  },
  languageBarFill: {
    height: '100%',
    background: theme.palette.gradient.secondary,
  },
});
