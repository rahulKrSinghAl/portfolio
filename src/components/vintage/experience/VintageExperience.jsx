import { useRef, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { experience } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { ThemedSectionDivider } from '../../theme-decorative-bridge';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const xPulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.3); opacity: 1; }
`;

// Flag marker SVG
function FlagMarker({ color, isActive }) {
  return (
    <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
      <line x1="3" y1="0" x2="3" y2="28" stroke={color} strokeWidth="1.5" />
      <polygon
        points="4,2 18,7 4,12"
        fill={isActive ? color : 'none'}
        stroke={color}
        strokeWidth="0.8"
        opacity={isActive ? 1 : 0.5}
      />
    </svg>
  );
}

export default function VintageExperience() {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { glow, typography, animations, spacing } = theme.custom;
  const isDark = theme.palette.mode === 'dark';
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const pathProgress = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.7, ease: animations.easing.smooth },
    },
  };

  return (
    <Box
      component="section"
      id="experience"
      ref={sectionRef}
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
              CHAPTER II
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
              Expeditions
            </Typography>
            <Typography sx={{
              fontFamily: typography.fonts.secondary,
              color: 'text.secondary',
              letterSpacing: typography.spacing.loose,
              mt: 0.5,
              fontStyle: 'italic',
            }}>
              Route Map
            </Typography>
          </MotionBox>

          {/* Desktop: Winding route map */}
          {!isMobile ? (
            <Box sx={{ position: 'relative', minHeight: 400 }}>
              {/* SVG Winding Path */}
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
              }}>
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 1000 400"
                  preserveAspectRatio="none"
                  style={{ position: 'absolute', top: 0, left: 0 }}
                >
                  {/* Background path (faint) */}
                  <path
                    d="M 50 200 C 200 50, 300 350, 500 200 C 700 50, 800 350, 950 200"
                    fill="none"
                    stroke={glow.primaryGlow(0.1)}
                    strokeWidth="2"
                    strokeDasharray="8 4"
                  />
                  {/* Animated progress path */}
                  <motion.path
                    d="M 50 200 C 200 50, 300 350, 500 200 C 700 50, 800 350, 950 200"
                    fill="none"
                    stroke={primaryColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{
                      pathLength: prefersReducedMotion ? 1 : pathProgress,
                      opacity: 0.5,
                    }}
                  />
                </svg>
              </Box>

              {/* Waypoint cards positioned along the path */}
              {experience.map((exp, i) => {
                const isLast = i === 0;
                const xPositions = ['5%', '35%', '65%'];
                const yPositions = ['10%', '55%', '10%'];

                return (
                  <MotionBox
                    key={i}
                    variants={itemVariants}
                    sx={{
                      position: 'absolute',
                      left: xPositions[i] || `${30 + i * 25}%`,
                      top: yPositions[i] || '25%',
                      width: { md: '280px', lg: '300px' },
                      zIndex: 1,
                    }}
                  >
                    {/* Flag marker */}
                    <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FlagMarker color={isLast ? secondaryColor : primaryColor} isActive={isLast} />
                      <Typography sx={{
                        fontFamily: typography.fonts.label,
                        fontSize: '0.55rem',
                        color: 'text.secondary',
                        letterSpacing: typography.spacing.extraLoose,
                      }}>
                        WAYPOINT {String.fromCharCode(65 + i)}
                      </Typography>
                    </Box>

                    {/* Ship's log card */}
                    <Card sx={{
                      bgcolor: isDark ? 'rgba(44, 31, 14, 0.7)' : 'rgba(250, 246, 238, 0.85)',
                      border: '1px solid',
                      borderColor: glow.primaryGlow(0.15),
                      borderRadius: '2px',
                      backdropFilter: 'blur(8px)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: glow.primaryGlow(0.3),
                        transform: 'translateY(-4px)',
                        boxShadow: `0 12px 32px ${glow.primaryGlow(0.12)}`,
                      },
                    }}>
                      <CardContent sx={{ p: 2.5 }}>
                        {/* Wax date seal */}
                        <Box sx={{
                          display: 'inline-block',
                          px: 1.5,
                          py: 0.3,
                          bgcolor: glow.secondaryGlow(0.15),
                          border: '1px solid',
                          borderColor: glow.secondaryGlow(0.2),
                          borderRadius: '2px',
                          mb: 1.5,
                        }}>
                          <Typography sx={{
                            fontFamily: typography.fonts.label,
                            fontSize: '0.55rem',
                            color: 'secondary.main',
                            letterSpacing: typography.spacing.loose,
                          }}>
                            {exp.period}
                          </Typography>
                        </Box>

                        <Typography sx={{
                          fontFamily: typography.fonts.primary,
                          fontWeight: typography.weights.semiBold,
                          fontSize: '1rem',
                          color: 'text.primary',
                          mb: 0.5,
                        }}>
                          {exp.title}
                        </Typography>

                        <Typography sx={{
                          fontFamily: typography.fonts.secondary,
                          fontSize: '0.8rem',
                          color: 'primary.main',
                          mb: 1.5,
                          fontStyle: 'italic',
                        }}>
                          {exp.company} — {exp.location}
                        </Typography>

                        {/* Quill bullet achievements */}
                        <Stack spacing={0.8}>
                          {exp.achievements.map((ach, j) => (
                            <Box key={j} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                              <Typography sx={{
                                color: 'secondary.main',
                                fontSize: '0.7rem',
                                mt: 0.3,
                                fontFamily: 'serif',
                              }}>
                                ❧
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
                      </CardContent>
                    </Card>
                  </MotionBox>
                );
              })}

              {/* X marks the spot — pulsing at current position */}
              <Box sx={{
                position: 'absolute',
                left: '3%',
                top: '5%',
                zIndex: 2,
                animation: prefersReducedMotion ? 'none' : `${xPulse} 2s ease-in-out infinite`,
              }}>
                <Typography sx={{
                  fontFamily: typography.fonts.primary,
                  fontWeight: typography.weights.extraBold,
                  fontSize: '1.8rem',
                  color: 'secondary.main',
                  textShadow: `0 0 8px ${glow.secondaryGlow(0.3)}`,
                  lineHeight: 1,
                }}>
                  ✕
                </Typography>
              </Box>
            </Box>
          ) : (
            /* Mobile: Vertical rope fallback */
            <Box sx={{ position: 'relative', pl: 4 }}>
              {/* Vertical rope line */}
              <Box sx={{
                position: 'absolute',
                left: 12,
                top: 0,
                bottom: 0,
                width: 2,
                bgcolor: glow.primaryGlow(0.15),
                backgroundImage: `repeating-linear-gradient(180deg, ${glow.primaryGlow(0.2)} 0px, ${glow.primaryGlow(0.2)} 8px, transparent 8px, transparent 16px)`,
              }} />

              <Stack spacing={4}>
                {experience.map((exp, i) => (
                  <MotionBox key={i} variants={itemVariants}>
                    {/* Waypoint dot */}
                    <Box sx={{
                      position: 'absolute',
                      left: 6,
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      bgcolor: i === 0 ? 'secondary.main' : 'primary.main',
                      border: '2px solid',
                      borderColor: isDark ? 'background.default' : 'background.paper',
                    }} />

                    <Card sx={{
                      bgcolor: isDark ? 'rgba(44, 31, 14, 0.6)' : 'rgba(250, 246, 238, 0.8)',
                      border: '1px solid',
                      borderColor: glow.primaryGlow(0.12),
                      borderRadius: '2px',
                    }}>
                      <CardContent sx={{ p: 2.5 }}>
                        <Box sx={{
                          display: 'inline-block',
                          px: 1.5,
                          py: 0.3,
                          bgcolor: glow.secondaryGlow(0.12),
                          border: '1px solid',
                          borderColor: glow.secondaryGlow(0.15),
                          borderRadius: '2px',
                          mb: 1,
                        }}>
                          <Typography sx={{
                            fontFamily: typography.fonts.label,
                            fontSize: '0.55rem',
                            color: 'secondary.main',
                            letterSpacing: typography.spacing.loose,
                          }}>
                            {exp.period}
                          </Typography>
                        </Box>

                        <Typography sx={{
                          fontFamily: typography.fonts.primary,
                          fontWeight: typography.weights.semiBold,
                          fontSize: '1rem',
                          color: 'text.primary',
                          mb: 0.3,
                        }}>
                          {exp.title}
                        </Typography>

                        <Typography sx={{
                          fontFamily: typography.fonts.secondary,
                          fontSize: '0.8rem',
                          color: 'primary.main',
                          mb: 1.5,
                          fontStyle: 'italic',
                        }}>
                          {exp.company} — {exp.location}
                        </Typography>

                        <Stack spacing={0.6}>
                          {exp.achievements.map((ach, j) => (
                            <Box key={j} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                              <Typography sx={{ color: 'secondary.main', fontSize: '0.65rem', mt: 0.3, fontFamily: 'serif' }}>❧</Typography>
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
                      </CardContent>
                    </Card>
                  </MotionBox>
                ))}
              </Stack>
            </Box>
          )}
        </MotionBox>
      </Container>

      <ThemedSectionDivider variant="compass" />
    </Box>
  );
}
