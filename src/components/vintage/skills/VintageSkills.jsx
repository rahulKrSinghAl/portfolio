import { useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Paper,
  LinearProgress,
} from '@mui/material';
import { FaReact, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiNextdotjs, SiRedux, SiMui, SiJavascript, SiTypescript } from 'react-icons/si';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { skills, languages } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { ThemedSectionDivider } from '../../theme-decorative-bridge';

const MotionBox = motion.create(Box);

const skillIcons = {
  React: FaReact,
  'Next.js': SiNextdotjs,
  Redux: SiRedux,
  MUI: SiMui,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
};

// Ink bottle fill levels for languages
const languageFills = {
  JavaScript: 90,
  TypeScript: 85,
};

export default function VintageSkills() {
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
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12, delayChildren: 0.1 },
    },
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
      id="skills"
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
              CHAPTER III
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
              Cartography
            </Typography>
            <Typography sx={{
              fontFamily: typography.fonts.secondary,
              color: 'text.secondary',
              letterSpacing: typography.spacing.loose,
              mt: 0.5,
              fontStyle: 'italic',
            }}>
              Specimen Cabinet
            </Typography>
          </MotionBox>

          {/* Wooden specimen cabinet */}
          <MotionBox
            variants={itemVariants}
            sx={{
              border: '3px solid',
              borderColor: isDark ? 'rgba(184, 134, 11, 0.3)' : 'rgba(184, 134, 11, 0.25)',
              borderRadius: '4px',
              p: { xs: 2, md: 3 },
              bgcolor: isDark ? 'rgba(44, 31, 14, 0.3)' : 'rgba(245, 230, 200, 0.4)',
              position: 'relative',
              boxShadow: isDark
                ? 'inset 0 2px 8px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.3)'
                : 'inset 0 2px 8px rgba(92,68,9,0.08), 0 4px 16px rgba(92,68,9,0.1)',
            }}
          >
            {/* Brass corner brackets */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => {
              const isTop = corner.includes('top');
              const isLeft = corner.includes('left');
              return (
                <Box
                  key={corner}
                  sx={{
                    position: 'absolute',
                    [isTop ? 'top' : 'bottom']: -2,
                    [isLeft ? 'left' : 'right']: -2,
                    width: 20,
                    height: 20,
                    [isTop ? 'borderTop' : 'borderBottom']: '3px solid',
                    [isLeft ? 'borderLeft' : 'borderRight']: '3px solid',
                    borderColor: isDark ? 'rgba(218, 165, 32, 0.5)' : 'rgba(184, 134, 11, 0.4)',
                  }}
                />
              );
            })}

            <Grid container spacing={3}>
              {/* Compartment 1: Frontend specimens (green felt) */}
              <Grid size={{ xs: 12, md: 4 }}>
                <MotionBox variants={itemVariants}>
                  <Box sx={{
                    bgcolor: isDark ? 'rgba(45, 90, 39, 0.15)' : 'rgba(45, 90, 39, 0.08)',
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(45, 90, 39, 0.25)' : 'rgba(45, 90, 39, 0.15)',
                    borderRadius: '2px',
                    p: 2.5,
                    minHeight: 280,
                  }}>
                    <Typography sx={{
                      fontFamily: typography.fonts.label,
                      fontSize: '0.6rem',
                      color: 'primary.main',
                      letterSpacing: typography.spacing.extraLoose,
                      mb: 2,
                      textAlign: 'center',
                      borderBottom: '1px solid',
                      borderColor: glow.primaryGlow(0.1),
                      pb: 1,
                    }}>
                      COLLECTED SPECIMENS
                    </Typography>

                    <Grid container spacing={1.5}>
                      {skills.frontend.map((skill, i) => {
                        const Icon = skillIcons[skill];
                        return (
                          <Grid size={{ xs: 6 }} key={skill}>
                            <MotionBox
                              variants={itemVariants}
                              whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 0.5,
                                p: 1.5,
                                bgcolor: isDark ? 'rgba(44, 31, 14, 0.5)' : 'rgba(250, 246, 238, 0.7)',
                                border: '1px solid',
                                borderColor: glow.primaryGlow(0.1),
                                borderRadius: '2px',
                                cursor: 'default',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                '&:hover': {
                                  borderColor: glow.primaryGlow(0.3),
                                },
                              }}
                            >
                              {/* Push pin */}
                              <Box sx={{
                                position: 'absolute',
                                top: -4,
                                right: 6,
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: secondaryColor,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                              }} />

                              {Icon && <Icon size={20} color={primaryColor} />}
                              <Typography sx={{
                                fontFamily: typography.fonts.label,
                                fontSize: '0.6rem',
                                color: 'text.primary',
                                letterSpacing: typography.spacing.normal,
                                textAlign: 'center',
                              }}>
                                {skill}
                              </Typography>
                            </MotionBox>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                </MotionBox>
              </Grid>

              {/* Compartment 2: Languages — ink bottle fill levels */}
              <Grid size={{ xs: 12, md: 4 }}>
                <MotionBox variants={itemVariants}>
                  <Box sx={{
                    bgcolor: isDark ? 'rgba(45, 90, 39, 0.15)' : 'rgba(45, 90, 39, 0.08)',
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(45, 90, 39, 0.25)' : 'rgba(45, 90, 39, 0.15)',
                    borderRadius: '2px',
                    p: 2.5,
                    minHeight: 280,
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <Typography sx={{
                      fontFamily: typography.fonts.label,
                      fontSize: '0.6rem',
                      color: 'primary.main',
                      letterSpacing: typography.spacing.extraLoose,
                      mb: 2,
                      textAlign: 'center',
                      borderBottom: '1px solid',
                      borderColor: glow.primaryGlow(0.1),
                      pb: 1,
                    }}>
                      INK RESERVES
                    </Typography>

                    <Stack spacing={3} sx={{ flex: 1, justifyContent: 'center' }}>
                      {skills.languages.map((lang) => {
                        const fill = languageFills[lang] || 75;
                        const LangIcon = skillIcons[lang];
                        return (
                          <Box key={lang}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                              {LangIcon && <LangIcon size={16} color={primaryColor} />}
                              <Typography sx={{
                                fontFamily: typography.fonts.secondary,
                                fontSize: '0.85rem',
                                color: 'text.primary',
                                fontWeight: typography.weights.medium,
                              }}>
                                {lang}
                              </Typography>
                              <Typography sx={{
                                fontFamily: typography.fonts.label,
                                fontSize: '0.55rem',
                                color: 'text.secondary',
                                ml: 'auto',
                              }}>
                                {fill}%
                              </Typography>
                            </Box>
                            {/* Ink bottle visualization */}
                            <Box sx={{
                              width: '100%',
                              height: 24,
                              border: '1px solid',
                              borderColor: glow.primaryGlow(0.2),
                              borderRadius: '2px',
                              overflow: 'hidden',
                              bgcolor: isDark ? 'rgba(26, 18, 9, 0.5)' : 'rgba(250, 246, 238, 0.5)',
                              position: 'relative',
                            }}>
                              <MotionBox
                                initial={{ width: 0 }}
                                whileInView={{ width: `${fill}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                                sx={{
                                  height: '100%',
                                  background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
                                  opacity: 0.7,
                                  borderRadius: '1px',
                                }}
                              />
                            </Box>
                          </Box>
                        );
                      })}
                    </Stack>
                  </Box>
                </MotionBox>
              </Grid>

              {/* Compartment 3: Spoken languages — filing drawer catalog cards */}
              <Grid size={{ xs: 12, md: 4 }}>
                <MotionBox variants={itemVariants}>
                  <Box sx={{
                    bgcolor: isDark ? 'rgba(45, 90, 39, 0.15)' : 'rgba(45, 90, 39, 0.08)',
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(45, 90, 39, 0.25)' : 'rgba(45, 90, 39, 0.15)',
                    borderRadius: '2px',
                    p: 2.5,
                    minHeight: 280,
                  }}>
                    <Typography sx={{
                      fontFamily: typography.fonts.label,
                      fontSize: '0.6rem',
                      color: 'primary.main',
                      letterSpacing: typography.spacing.extraLoose,
                      mb: 2,
                      textAlign: 'center',
                      borderBottom: '1px solid',
                      borderColor: glow.primaryGlow(0.1),
                      pb: 1,
                    }}>
                      FILED CATALOGS
                    </Typography>

                    <Stack spacing={2}>
                      {languages.map((lang, i) => (
                        <MotionBox
                          key={lang.name}
                          variants={itemVariants}
                          whileHover={prefersReducedMotion ? {} : { x: 8 }}
                          sx={{
                            p: 2,
                            bgcolor: isDark ? 'rgba(44, 31, 14, 0.5)' : 'rgba(250, 246, 238, 0.7)',
                            border: '1px solid',
                            borderColor: glow.primaryGlow(0.12),
                            borderRadius: '2px',
                            cursor: 'default',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            // Filing tab
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: -6,
                              left: `${20 + i * 30}%`,
                              width: 40,
                              height: 6,
                              bgcolor: isDark ? 'rgba(44, 31, 14, 0.7)' : 'rgba(245, 230, 200, 0.9)',
                              border: '1px solid',
                              borderBottom: 'none',
                              borderColor: glow.primaryGlow(0.12),
                              borderRadius: '2px 2px 0 0',
                            },
                            '&:hover': {
                              borderColor: glow.primaryGlow(0.25),
                            },
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                              <Typography sx={{
                                fontFamily: typography.fonts.primary,
                                fontWeight: typography.weights.semiBold,
                                fontSize: '0.95rem',
                                color: 'text.primary',
                              }}>
                                {lang.name}
                              </Typography>
                              <Typography sx={{
                                fontFamily: typography.fonts.label,
                                fontSize: '0.55rem',
                                color: 'text.secondary',
                                letterSpacing: typography.spacing.loose,
                              }}>
                                {lang.level}
                              </Typography>
                            </Box>
                            <Box sx={{
                              px: 1.5,
                              py: 0.3,
                              bgcolor: glow.primaryGlow(0.1),
                              border: '1px solid',
                              borderColor: glow.primaryGlow(0.2),
                              borderRadius: '2px',
                            }}>
                              <Typography sx={{
                                fontFamily: typography.fonts.label,
                                fontSize: '0.6rem',
                                color: 'primary.main',
                              }}>
                                {lang.proficiency}%
                              </Typography>
                            </Box>
                          </Box>
                        </MotionBox>
                      ))}
                    </Stack>
                  </Box>
                </MotionBox>
              </Grid>
            </Grid>

            {/* Brass nameplate at bottom */}
            <Box sx={{
              mt: 3,
              display: 'flex',
              justifyContent: 'center',
            }}>
              <Box sx={{
                px: 4,
                py: 1,
                bgcolor: isDark ? 'rgba(184, 134, 11, 0.15)' : 'rgba(184, 134, 11, 0.1)',
                border: '2px solid',
                borderColor: isDark ? 'rgba(218, 165, 32, 0.3)' : 'rgba(184, 134, 11, 0.25)',
                borderRadius: '2px',
              }}>
                <Typography sx={{
                  fontFamily: typography.fonts.label,
                  fontSize: '0.6rem',
                  color: isDark ? 'rgba(218, 165, 32, 0.8)' : 'rgba(184, 134, 11, 0.7)',
                  letterSpacing: typography.spacing.superLoose,
                  textAlign: 'center',
                }}>
                  CABINET OF TECHNICAL CURIOSITIES — EST. 2020
                </Typography>
              </Box>
            </Box>
          </MotionBox>
        </MotionBox>
      </Container>

      <ThemedSectionDivider variant="rope" />
    </Box>
  );
}
