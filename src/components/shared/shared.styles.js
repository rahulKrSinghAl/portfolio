export const getSharedStyles = (theme) => ({
  // Section container
  sectionContainer: {
    py: { xs: theme.custom.spacing.xxl, md: theme.custom.spacing.section },
    position: 'relative',
  },

  // Section header
  sectionHeader: {
    mb: theme.custom.spacing.xxl,
    textAlign: 'center',
  },

  // Glass card base
  glassCard: {
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

  // Grid item with flex
  gridItemFlex: {
    display: 'flex',
  },

  // Chip styles
  chip: {
    py: 2.5,
    px: theme.custom.spacing.xs,
    borderRadius: 0,
    fontWeight: theme.custom.typography.weights.medium,
    cursor: 'default',
    transition: `background-color ${theme.custom.animations.duration.fast}s ${theme.custom.animations.easing.default}, color ${theme.custom.animations.duration.fast}s ${theme.custom.animations.easing.default}`,
  },

  // Primary chip
  chipPrimary: {
    bgcolor: theme.palette.mode === 'dark'
      ? theme.custom.glow.primaryGlow(0.1)
      : theme.custom.glow.primaryGlow(0.08),
    color: 'primary.main',
    border: '2px solid',
    borderColor: 'primary.main',
    '&:hover': {
      bgcolor: 'primary.main',
      color: 'white',
    },
  },

  // Secondary chip
  chipSecondary: {
    bgcolor: theme.palette.mode === 'dark'
      ? theme.custom.glow.secondaryGlow(0.1)
      : theme.custom.glow.secondaryGlow(0.15),
    color: 'secondary.main',
    border: '2px solid',
    borderColor: 'secondary.main',
    '&:hover': {
      bgcolor: 'secondary.main',
      color: 'white',
    },
  },
});
