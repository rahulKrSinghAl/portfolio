import { useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Grid,
  Chip,
} from '@mui/material';
import { People } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { projects } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { ThemedSectionDivider } from '../../theme-decorative-bridge';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

// Pseudo-random rotation based on index
function getRotation(i) {
  const rotations = [-2.5, 1.8, -1.2, 2.8, -0.8, 1.5];
  return rotations[i % rotations.length];
}

// Push pin colors
const pinColors = ['#B83A1B', '#C4A35A', '#2D5A27', '#8B6914'];

function isActive(period) {
  return period.toLowerCase().includes('present');
}

export default function VintageProjects() {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { glow, typography, animations, spacing } = theme.custom;
  const isDark = theme.palette.mode === 'dark';
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.18, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40, scale: 0.97 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.7,
        delay: i * 0.15,
        ease: animations.easing.smooth,
      },
    }),
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: animations.easing.smooth },
    },
  };

  return (
    <Box
      component="section"
      id="projects"
      sx={{
        py: { xs: spacing.xxl, md: spacing.section },
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <MotionBox
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <MotionBox variants={itemVariants} sx={{ mb: spacing.xxl, textAlign: 'center' }}>
            <Typography sx={{
              fontFamily: typography.fonts.label,
              fontSize: '0.7rem',
              color: 'primary.main',
              letterSpacing: typography.spacing.superLoose,
              mb: 1,
            }}>
              CHAPTER IV
            </Typography>
            <Typography variant="h3" sx={{
              fontFamily: typography.fonts.primary,
              fontWeight: typography.weights.bold,
              background: theme.palette.gradient?.primary,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: typography.spacing.relaxed,
            }}>
              Discoveries
            </Typography>
            <Typography sx={{
              fontFamily: typography.fonts.secondary,
              color: 'text.secondary',
              letterSpacing: typography.spacing.loose,
              mt: 0.5,
              fontStyle: 'italic',
            }}>
              Field Reports
            </Typography>
          </MotionBox>

          {/* Corkboard */}
          <Box sx={{
            p: { xs: 2, md: 4 },
            bgcolor: isDark ? 'rgba(139, 115, 85, 0.08)' : 'rgba(196, 162, 101, 0.12)',
            border: '4px solid',
            borderColor: isDark ? 'rgba(139, 115, 85, 0.25)' : 'rgba(139, 115, 85, 0.3)',
            borderRadius: '4px',
            boxShadow: isDark
              ? 'inset 0 2px 12px rgba(0,0,0,0.3)'
              : 'inset 0 2px 12px rgba(92,68,9,0.08)',
            // Cork texture via subtle noise pattern
            backgroundImage: isDark
              ? 'none'
              : `radial-gradient(circle, rgba(139,115,85,0.03) 1px, transparent 1px)`,
            backgroundSize: '8px 8px',
          }}>
            <Grid container spacing={3}>
              {projects.map((project, i) => {
                const rotation = getRotation(i);
                const pinColor = pinColors[i % pinColors.length];
                const active = isActive(project.period);

                return (
                  <Grid size={{ xs: 12, md: 6 }} key={i}>
                    <MotionCard
                      custom={i}
                      variants={cardVariants}
                      whileHover={prefersReducedMotion ? {} : {
                        rotate: 0,
                        y: -8,
                        scale: 1.02,
                        boxShadow: `0 16px 40px ${glow.primaryGlow(0.15)}`,
                      }}
                      sx={{
                        transform: `rotate(${rotation}deg)`,
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        bgcolor: isDark ? 'rgba(44, 31, 14, 0.7)' : 'rgba(250, 246, 238, 0.9)',
                        border: '1px solid',
                        borderColor: glow.primaryGlow(0.12),
                        borderRadius: '2px',
                        overflow: 'visible',
                        boxShadow: isDark
                          ? '4px 4px 12px rgba(0,0,0,0.4)'
                          : '4px 4px 12px rgba(92,68,9,0.12)',
                      }}
                    >
                      {/* Push pin */}
                      <Box sx={{
                        position: 'absolute',
                        top: -8,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        bgcolor: pinColor,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                        zIndex: 2,
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 3,
                          left: 3,
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255,255,255,0.3)',
                        },
                      }} />

                      {/* Postage stamp decoration (top right) */}
                      <Box sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 36,
                        height: 44,
                        border: '1px solid',
                        borderColor: glow.primaryGlow(0.2),
                        borderRadius: '1px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: isDark ? 'rgba(26, 18, 9, 0.5)' : 'rgba(250, 246, 238, 0.5)',
                        // Zigzag border simulation via repeated gradient
                        backgroundImage: `
                          radial-gradient(circle at 0 0, transparent 3px, ${isDark ? 'rgba(44,31,14,0.5)' : 'rgba(250,246,238,0.5)'} 3px),
                          radial-gradient(circle at 6px 0, transparent 3px, ${isDark ? 'rgba(44,31,14,0.5)' : 'rgba(250,246,238,0.5)'} 3px)
                        `,
                        backgroundSize: '12px 6px',
                        backgroundPosition: '0 -3px',
                        backgroundRepeat: 'repeat-x',
                      }}>
                        <Typography sx={{
                          fontFamily: typography.fonts.label,
                          fontSize: '0.45rem',
                          color: 'text.secondary',
                          textAlign: 'center',
                          lineHeight: 1.2,
                        }}>
                          {project.period.split(' - ')[0]}
                        </Typography>
                      </Box>

                      <CardContent sx={{ p: 3, pt: 2 }}>
                        <Typography sx={{
                          fontFamily: typography.fonts.primary,
                          fontWeight: typography.weights.bold,
                          fontSize: '1.15rem',
                          color: 'text.primary',
                          mb: 0.5,
                          pr: 5,
                        }}>
                          {project.title}
                        </Typography>

                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                          <Typography sx={{
                            fontFamily: typography.fonts.secondary,
                            fontSize: '0.8rem',
                            color: 'primary.main',
                            fontStyle: 'italic',
                          }}>
                            {project.role}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <People sx={{ fontSize: 14, color: 'text.secondary' }} />
                            <Typography sx={{
                              fontFamily: typography.fonts.label,
                              fontSize: '0.6rem',
                              color: 'text.secondary',
                            }}>
                              {project.teamSize}
                            </Typography>
                          </Box>
                        </Stack>

                        <Typography sx={{
                          fontFamily: typography.fonts.secondary,
                          fontSize: '0.82rem',
                          color: 'text.secondary',
                          mb: 2,
                          lineHeight: 1.5,
                          fontStyle: 'italic',
                        }}>
                          {project.description}
                        </Typography>

                        {/* Diamond bullet achievements */}
                        <Stack spacing={0.6}>
                          {project.achievements.map((ach, j) => (
                            <Box key={j} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                              <Typography sx={{
                                color: 'secondary.main',
                                fontSize: '0.5rem',
                                mt: 0.5,
                              }}>
                                ◆
                              </Typography>
                              <Typography sx={{
                                fontFamily: typography.fonts.secondary,
                                fontSize: '0.8rem',
                                color: 'text.secondary',
                                lineHeight: 1.5,
                              }}>
                                {ach}
                              </Typography>
                            </Box>
                          ))}
                        </Stack>

                        {/* Rubber stamp status badge */}
                        <Box sx={{
                          mt: 2,
                          display: 'inline-block',
                          transform: 'rotate(-8deg)',
                          px: 2,
                          py: 0.5,
                          border: '2px solid',
                          borderColor: active ? secondaryColor : primaryColor,
                          borderRadius: '2px',
                          opacity: 0.6,
                        }}>
                          <Typography sx={{
                            fontFamily: typography.fonts.label,
                            fontSize: '0.65rem',
                            color: active ? 'secondary.main' : 'primary.main',
                            letterSpacing: typography.spacing.extraLoose,
                            fontWeight: typography.weights.bold,
                          }}>
                            {active ? 'ACTIVE EXPEDITION' : 'COMPLETED'}
                          </Typography>
                        </Box>
                      </CardContent>
                    </MotionCard>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </MotionBox>
      </Container>

      <ThemedSectionDivider variant="flourish" />
    </Box>
  );
}
