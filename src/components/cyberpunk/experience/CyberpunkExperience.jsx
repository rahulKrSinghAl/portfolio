import { useRef } from 'react';
import {
  Box,
  Container,
  Typography,
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

const currentFlow = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 30px; }
`;

const ledBlink = keyframes`
  0%, 40% { opacity: 1; box-shadow: 0 0 6px currentColor; }
  50%, 90% { opacity: 0.3; box-shadow: 0 0 2px currentColor; }
  100% { opacity: 1; box-shadow: 0 0 6px currentColor; }
`;

const chipPulse = keyframes`
  0%, 100% { box-shadow: 0 0 4px currentColor, inset 0 0 2px currentColor; }
  50% { box-shadow: 0 0 12px currentColor, 0 0 4px currentColor, inset 0 0 4px currentColor; }
`;

const cursorBlink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

export default function CyberpunkExperience() {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { glow, typography, animations, spacing } = theme.custom;
  const isDark = theme.palette.mode === 'dark';
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const traceProgress = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: prefersReducedMotion ? 0 : 0.2, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -20 },
    visible: { opacity: 1, x: 0, transition: { duration: prefersReducedMotion ? 0 : 0.5, ease: animations.easing.smooth } },
  };

  return (
    <Box component="section" id="experience" ref={sectionRef}
      sx={{ py: { xs: spacing.xxl, md: spacing.section }, position: 'relative' }}
    >
      <Container maxWidth="lg">
        <MotionBox variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>

          {/* Section Header */}
          <MotionBox variants={itemVariants} sx={{ mb: spacing.xxl, textAlign: 'center' }}>
            <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.65rem', color: 'secondary.main', letterSpacing: typography.spacing.superLoose, mb: 0.5 }}>
              RNT-02
            </Typography>
            <Typography variant="h3" sx={{
              fontFamily: typography.fonts.primary, fontWeight: typography.weights.bold,
              background: theme.palette.gradient?.primary, backgroundClip: 'text',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              letterSpacing: typography.spacing.relaxed,
            }}>
              RUNTIME_LOG
            </Typography>
            <Typography sx={{ fontFamily: typography.fonts.secondary, color: 'text.secondary', letterSpacing: typography.spacing.loose, mt: 0.5 }}>
              Execution History
            </Typography>
          </MotionBox>

          {/* ════════════════════════════════════════════
              UNIQUE: Vertical PCB circuit board timeline
              - Left: PCB trace with animated current + chip nodes
              - Right: Terminal window cards
              Totally different from vintage's winding route map
              ════════════════════════════════════════════ */}

          <Box sx={{ position: 'relative' }}>
            {/* PCB trace — animated dashed current flow */}
            <Box sx={{
              position: 'absolute',
              left: { xs: 16, md: 40 },
              top: 0, bottom: 0, width: 2,
              bgcolor: glow.secondaryGlow(0.08),
              zIndex: 0,
            }}>
              {/* Animated flowing current overlay */}
              <Box sx={{
                position: 'absolute', inset: 0,
                backgroundImage: `repeating-linear-gradient(180deg, ${secondaryColor}50 0px, ${secondaryColor}50 4px, transparent 4px, transparent 10px)`,
                animation: prefersReducedMotion ? 'none' : `${currentFlow} 1.5s linear infinite`,
              }} />
              {/* Progress fill */}
              <motion.div style={{
                position: 'absolute', left: 0, top: 0, width: '100%',
                background: secondaryColor, transformOrigin: 'top',
                scaleY: prefersReducedMotion ? 1 : traceProgress, opacity: 0.4,
                height: '100%',
              }} />
            </Box>

            <Stack spacing={0}>
              {experience.map((exp, i) => {
                const isFirst = i === 0;
                const ledColor = isFirst ? '#39FF14' : '#FFE500';

                return (
                  <MotionBox key={i} variants={itemVariants} sx={{ position: 'relative', pl: { xs: 6, md: 10 }, pb: 6 }}>

                    {/* ── CHIP-SOCKET NODE ── */}
                    <Box sx={{
                      position: 'absolute',
                      left: { xs: 8, md: 32 },
                      top: 0,
                      width: 20, height: 20,
                      border: '2px solid', borderColor: secondaryColor, borderRadius: '3px',
                      bgcolor: isDark ? '#0A0A0F' : '#F0F0F5',
                      zIndex: 2,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: secondaryColor,
                      animation: isFirst && !prefersReducedMotion ? `${chipPulse} 2s ease-in-out infinite` : 'none',
                    }}>
                      <Box sx={{ width: 6, height: 6, bgcolor: secondaryColor, borderRadius: '1px', opacity: 0.8 }} />
                    </Box>

                    {/* Horizontal PCB trace from node to card */}
                    <Box sx={{
                      position: 'absolute',
                      left: { xs: 28, md: 52 },
                      top: 9, height: 2,
                      width: { xs: 12, md: 20 },
                      bgcolor: glow.secondaryGlow(0.2),
                    }} />

                    {/* ── TERMINAL WINDOW CARD ── */}
                    <Box sx={{
                      bgcolor: isDark ? 'rgba(12,12,20,0.7)' : 'rgba(240,240,248,0.85)',
                      border: '1px solid', borderColor: glow.secondaryGlow(0.1),
                      borderRadius: '6px', overflow: 'hidden',
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        borderColor: glow.secondaryGlow(0.25),
                        boxShadow: `0 8px 32px ${glow.secondaryGlow(0.06)}, 0 0 1px ${glow.secondaryGlow(0.15)}`,
                        transform: 'translateX(4px)',
                      },
                    }}>
                      {/* Terminal title bar */}
                      <Box sx={{
                        px: 2, py: 0.8,
                        bgcolor: isDark ? 'rgba(0,240,255,0.04)' : 'rgba(0,184,196,0.03)',
                        borderBottom: '1px solid', borderColor: glow.secondaryGlow(0.06),
                        display: 'flex', alignItems: 'center', gap: 1.5,
                      }}>
                        {/* Traffic lights (terminal style) */}
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: ledColor, color: ledColor,
                            boxShadow: `0 0 4px ${ledColor}60`,
                            animation: isFirst && !prefersReducedMotion ? `${ledBlink} 2.5s ease-in-out infinite` : 'none',
                          }} />
                          <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: glow.secondaryGlow(0.15) }} />
                          <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: glow.secondaryGlow(0.1) }} />
                        </Box>

                        <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.55rem', color: 'text.secondary', letterSpacing: typography.spacing.normal, flex: 1 }}>
                          {exp.company.toLowerCase().replace(/\s+/g, '_')}.process
                        </Typography>

                        <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.5rem', color: 'secondary.main', opacity: 0.5 }}>
                          {exp.period}
                        </Typography>
                      </Box>

                      {/* Terminal body */}
                      <Box sx={{ p: { xs: 2, md: 2.5 } }}>
                        <Typography sx={{
                          fontFamily: typography.fonts.primary, fontWeight: typography.weights.semiBold,
                          fontSize: '1.05rem', color: 'text.primary', mb: 0.3,
                        }}>
                          {exp.title}
                        </Typography>

                        <Typography sx={{
                          fontFamily: typography.fonts.secondary, fontSize: '0.82rem', color: 'secondary.main', mb: 2,
                        }}>
                          {exp.company} — {exp.location}
                        </Typography>

                        {/* Achievements with terminal prompts */}
                        <Stack spacing={1}>
                          {exp.achievements.map((ach, j) => (
                            <Box key={j} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, flexShrink: 0, mt: 0.2 }}>
                                <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.65rem', color: 'secondary.main', opacity: 0.5 }}>
                                  {'>_'}
                                </Typography>
                              </Box>
                              <Typography sx={{ fontFamily: typography.fonts.secondary, fontSize: '0.82rem', color: 'text.secondary', lineHeight: 1.6 }}>
                                {ach}
                              </Typography>
                            </Box>
                          ))}
                        </Stack>

                        {/* Blinking cursor at bottom */}
                        <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.6rem', color: 'secondary.main', opacity: 0.3 }}>
                            {'>'}
                          </Typography>
                          <Box sx={{
                            width: 6, height: 12, bgcolor: 'secondary.main', opacity: 0.4,
                            animation: prefersReducedMotion ? 'none' : `${cursorBlink} 1s step-end infinite`,
                          }} />
                        </Box>
                      </Box>
                    </Box>
                  </MotionBox>
                );
              })}
            </Stack>
          </Box>

        </MotionBox>
      </Container>

      <ThemedSectionDivider variant="neon" />
    </Box>
  );
}
