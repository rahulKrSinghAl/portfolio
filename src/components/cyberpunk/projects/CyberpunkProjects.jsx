import {
  Box,
  Container,
  Typography,
  Stack,
} from '@mui/material';
import { People } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { projects } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { ThemedSectionDivider } from '../../theme-decorative-bridge';

const MotionBox = motion.create(Box);

const hologramShimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const glitchShake = keyframes`
  0%, 90%, 100% { transform: perspective(800px) rotateY(-4deg) translate(0); }
  92% { transform: perspective(800px) rotateY(-4deg) translate(-3px, 1px); }
  94% { transform: perspective(800px) rotateY(-4deg) translate(2px, -1px); }
  96% { transform: perspective(800px) rotateY(-4deg) translate(-1px, 0); }
  98% { transform: perspective(800px) rotateY(-4deg) translate(2px, 1px); }
`;

const neonPulse = keyframes`
  0%, 100% { opacity: 0.8; filter: brightness(1); }
  50% { opacity: 1; filter: brightness(1.3); }
`;

function isActive(period) {
  return period.toLowerCase().includes('present');
}

export default function CyberpunkProjects() {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { glow, typography, animations, spacing } = theme.custom;
  const isDark = theme.palette.mode === 'dark';
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: prefersReducedMotion ? 0 : 0.2, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30, rotateY: prefersReducedMotion ? 0 : -8 },
    visible: { opacity: 1, y: 0, rotateY: 0, transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: animations.easing.smooth } },
  };

  return (
    <Box component="section" id="projects"
      sx={{ py: { xs: spacing.xxl, md: spacing.section }, position: 'relative' }}
    >
      <Container maxWidth="lg">
        <MotionBox variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>

          {/* Section Header */}
          <MotionBox variants={itemVariants} sx={{ mb: spacing.xxl, textAlign: 'center' }}>
            <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.65rem', color: 'secondary.main', letterSpacing: typography.spacing.superLoose, mb: 0.5 }}>
              DPL-04
            </Typography>
            <Typography variant="h3" sx={{
              fontFamily: typography.fonts.primary, fontWeight: typography.weights.bold,
              background: theme.palette.gradient?.primary, backgroundClip: 'text',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              letterSpacing: typography.spacing.relaxed,
            }}>
              DEPLOYMENTS
            </Typography>
            <Typography sx={{ fontFamily: typography.fonts.secondary, color: 'text.secondary', letterSpacing: typography.spacing.loose, mt: 0.5 }}>
              Active Instances
            </Typography>
          </MotionBox>

          {/* ════════════════════════════════════════════
              UNIQUE: Stacked full-width hologram panels
              - Each card is a floating hologram display
              - Perspective skew + wireframe base
              - Holographic shimmer overlay
              - Not a 2-col grid like Vintage corkboard
              ════════════════════════════════════════════ */}

          {/* Wireframe base grid (behind everything) */}
          <Box sx={{
            position: 'relative',
            '&::before': {
              content: '""', position: 'absolute', left: 0, right: 0,
              bottom: -20, height: 60,
              background: `repeating-linear-gradient(90deg, ${glow.secondaryGlow(0.03)} 0px, ${glow.secondaryGlow(0.03)} 1px, transparent 1px, transparent 40px), repeating-linear-gradient(0deg, ${glow.secondaryGlow(0.03)} 0px, ${glow.secondaryGlow(0.03)} 1px, transparent 1px, transparent 20px)`,
              maskImage: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.5) 70%, transparent)',
              WebkitMaskImage: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.5) 70%, transparent)',
              pointerEvents: 'none',
            },
          }}>
            <Stack spacing={4}>
              {projects.map((project, i) => {
                const active = isActive(project.period);
                const isEven = i % 2 === 0;

                return (
                  <MotionBox
                    key={i}
                    variants={itemVariants}
                    whileHover={prefersReducedMotion ? {} : {
                      rotateY: 0, scale: 1.01, y: -6,
                      transition: { duration: 0.2 },
                    }}
                    sx={{
                      position: 'relative',
                      transform: { xs: 'none', md: `perspective(1000px) rotateY(${isEven ? '-3' : '3'}deg)` },
                      transformStyle: 'preserve-3d',
                      maxWidth: { xs: '100%', md: '85%' },
                      ml: { xs: 0, md: isEven ? 0 : 'auto' },
                      mr: { xs: 0, md: isEven ? 'auto' : 0 },
                      cursor: 'default',
                      '&:hover': {
                        '& .holo-shimmer': {
                          animationDuration: '2s',
                        },
                      },
                    }}
                  >
                    {/* Hologram panel */}
                    <Box sx={{
                      bgcolor: isDark ? 'rgba(12,12,20,0.65)' : 'rgba(240,240,248,0.8)',
                      border: '1px solid', borderColor: glow.secondaryGlow(0.12),
                      borderRadius: '6px', overflow: 'hidden',
                      backdropFilter: 'blur(12px)',
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        borderColor: glow.secondaryGlow(0.3),
                        boxShadow: `0 16px 48px ${glow.secondaryGlow(0.08)}, 0 0 1px ${glow.secondaryGlow(0.2)}`,
                      },
                    }}>
                      {/* Holographic shimmer band */}
                      <Box className="holo-shimmer" sx={{
                        position: 'absolute', inset: 0,
                        background: `linear-gradient(110deg, transparent 20%, ${glow.secondaryGlow(0.03)} 40%, ${glow.primaryGlow(0.04)} 50%, ${glow.secondaryGlow(0.03)} 60%, transparent 80%)`,
                        backgroundSize: '200% 100%',
                        animation: prefersReducedMotion ? 'none' : `${hologramShimmer} 5s linear infinite`,
                        pointerEvents: 'none', zIndex: 1,
                      }} />

                      {/* Top bar with status */}
                      <Box sx={{
                        px: 3, py: 1,
                        borderBottom: '1px solid', borderColor: glow.secondaryGlow(0.06),
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        position: 'relative', zIndex: 2,
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: active ? '#39FF14' : '#FFE500', boxShadow: `0 0 4px ${active ? '#39FF14' : '#FFE500'}50` }} />
                          <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.5rem', color: 'text.secondary', letterSpacing: typography.spacing.loose, opacity: 0.5 }}>
                            INSTANCE_{String(i + 1).padStart(2, '0')} // {project.period}
                          </Typography>
                        </Box>

                        {/* LIVE / ARCHIVED neon stamp */}
                        <Box sx={{
                          px: 1.5, py: 0.2,
                          border: '1px solid', borderColor: active ? '#39FF14' : primaryColor,
                          borderRadius: '2px',
                          animation: active && !prefersReducedMotion ? `${neonPulse} 2s ease-in-out infinite` : 'none',
                        }}>
                          <Typography sx={{
                            fontFamily: typography.fonts.label, fontSize: '0.5rem',
                            color: active ? '#39FF14' : 'primary.main',
                            letterSpacing: typography.spacing.extraLoose,
                            textShadow: active ? '0 0 6px #39FF1460' : `0 0 4px ${glow.primaryGlow(0.2)}`,
                          }}>
                            {active ? 'LIVE' : 'ARCHIVED'}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Content area */}
                      <Box sx={{ p: { xs: 2.5, md: 3.5 }, position: 'relative', zIndex: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 4 } }}>
                          {/* Left: title + meta */}
                          <Box sx={{ flex: '0 0 auto', maxWidth: { xs: '100%', md: 280 } }}>
                            <Typography sx={{
                              fontFamily: typography.fonts.primary, fontWeight: typography.weights.bold,
                              fontSize: '1.3rem', color: 'text.primary', mb: 0.5, lineHeight: 1.2,
                            }}>
                              {project.title}
                            </Typography>

                            <Typography sx={{ fontFamily: typography.fonts.secondary, fontSize: '0.85rem', color: 'secondary.main', mb: 1 }}>
                              {project.role}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                              <People sx={{ fontSize: 14, color: 'text.secondary', opacity: 0.5 }} />
                              <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.6rem', color: 'text.secondary', opacity: 0.5 }}>
                                {project.teamSize} PLAYERS
                              </Typography>
                            </Box>

                            <Typography sx={{
                              fontFamily: typography.fonts.secondary, fontSize: '0.85rem',
                              color: 'text.secondary', lineHeight: 1.6,
                            }}>
                              {project.description}
                            </Typography>
                          </Box>

                          {/* Right: achievements list */}
                          <Box sx={{ flex: 1, borderLeft: { xs: 'none', md: '1px solid' }, borderColor: glow.secondaryGlow(0.06), pl: { xs: 0, md: 4 } }}>
                            <Typography sx={{
                              fontFamily: typography.fonts.label, fontSize: '0.5rem', color: 'text.secondary',
                              letterSpacing: typography.spacing.superLoose, mb: 1.5, opacity: 0.3,
                            }}>
                              DEPLOYMENT LOG
                            </Typography>
                            <Stack spacing={1}>
                              {project.achievements.map((ach, j) => (
                                <Box key={j} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                                  <Box sx={{
                                    mt: 0.6, width: 4, height: 4, borderRadius: '1px',
                                    bgcolor: j === 0 ? secondaryColor : glow.secondaryGlow(0.3),
                                    boxShadow: j === 0 ? `0 0 4px ${secondaryColor}60` : 'none',
                                    flexShrink: 0,
                                  }} />
                                  <Typography sx={{ fontFamily: typography.fonts.secondary, fontSize: '0.85rem', color: 'text.secondary', lineHeight: 1.6 }}>
                                    {ach}
                                  </Typography>
                                </Box>
                              ))}
                            </Stack>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    {/* Wireframe base shadow under panel */}
                    <Box sx={{
                      display: { xs: 'none', md: 'block' },
                      mx: 4, height: 8,
                      background: `linear-gradient(180deg, ${glow.secondaryGlow(0.04)}, transparent)`,
                      borderRadius: '0 0 50% 50%',
                    }} />
                  </MotionBox>
                );
              })}
            </Stack>
          </Box>

        </MotionBox>
      </Container>

      <ThemedSectionDivider variant="circuit" />
    </Box>
  );
}
