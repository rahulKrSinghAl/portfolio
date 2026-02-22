import { Box, Container, Typography, Grid, Chip, useTheme } from '@mui/material';
import { useAestheticTheme } from '../../context/AestheticThemeContext';
import { themeList } from '../../themes';
import { getSharedStyles, RevealOnScroll } from '../shared';

function ThemeCard({ theme: aestheticTheme, isActive, onSelect }) {
  const muiTheme = useTheme();
  const shared = getSharedStyles(muiTheme);
  const swatches = [
    aestheticTheme.colors[Object.keys(aestheticTheme.colors)[0]]?.main,
    aestheticTheme.colors[Object.keys(aestheticTheme.colors)[1]]?.main,
  ].filter(Boolean);

  return (
    <Box
      onClick={onSelect}
      sx={{
        ...shared.glassCard,
        cursor: 'pointer',
        p: { xs: muiTheme.custom.spacing.md, md: muiTheme.custom.spacing.lg },
        position: 'relative',
        borderColor: isActive ? 'primary.main' : shared.glassCard.borderColor,
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: `0 8px 32px ${muiTheme.custom.glow.primaryGlow(0.2)}`,
        },
      }}
    >
      {isActive && (
        <Chip
          label="Active"
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: 'primary.main',
            color: 'white',
            fontWeight: muiTheme.custom.typography.weights.semiBold,
            borderRadius: 0,
          }}
        />
      )}

      {/* Icon */}
      <Typography
        variant="h2"
        sx={{
          mb: muiTheme.custom.spacing.sm,
          opacity: 0.25,
          lineHeight: 1,
        }}
      >
        {aestheticTheme.icon}
      </Typography>

      {/* Name */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: muiTheme.custom.typography.weights.semiBold,
          mb: 1,
        }}
      >
        {aestheticTheme.name}
      </Typography>

      {/* Description */}
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', mb: muiTheme.custom.spacing.sm }}
      >
        {aestheticTheme.description}
      </Typography>

      {/* Color swatches */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        {swatches.map((color) => (
          <Box
            key={color}
            sx={{
              width: 24,
              height: 24,
              bgcolor: color,
              border: '2px solid',
              borderColor: 'divider',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default function ThemeGallery() {
  const muiTheme = useTheme();
  const { themeId, setThemeId } = useAestheticTheme();

  return (
    <Box
      id="themes"
      component="section"
      sx={{
        py: { xs: muiTheme.custom.spacing.xxl, md: muiTheme.custom.spacing.section },
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={muiTheme.custom.spacing.md}>
          {themeList.map((t) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={t.id} sx={{ display: 'flex' }}>
              <RevealOnScroll style={{ width: '100%' }}>
                <ThemeCard
                  theme={t}
                  isActive={t.id === themeId}
                  onSelect={() => setThemeId(t.id)}
                />
              </RevealOnScroll>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
