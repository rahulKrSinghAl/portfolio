import {
  Box,
  Container,
  Typography,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { personalInfo, strengths } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { ThemedSectionDivider } from '../../theme-decorative-bridge';

const MotionBox = motion.create(Box);

const tickerScroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const powerSpark = keyframes`
  0%, 100% { opacity: 0; transform: translateX(0) scale(0); }
  50% { opacity: 1; transform: translateX(4px) scale(1); }
`;

const neonBuzz = keyframes`
  0%, 100% { text-shadow: 0 0 6px currentColor, 0 0 12px currentColor; opacity: 1; }
  3% { text-shadow: 0 0 2px currentColor; opacity: 0.7; }
  6% { text-shadow: 0 0 8px currentColor, 0 0 16px currentColor; opacity: 1; }
  50% { text-shadow: 0 0 6px currentColor, 0 0 12px currentColor; opacity: 1; }
  53% { text-shadow: 0 0 3px currentColor; opacity: 0.8; }
  56% { text-shadow: 0 0 6px currentColor, 0 0 12px currentColor; opacity: 1; }
`;

const rainDrop = keyframes`
  0% { top: -5%; opacity: 0; }
  5% { opacity: 0.15; }
  95% { opacity: 0.15; }
  100% { top: 105%; opacity: 0; }
`;

export default function CyberpunkAbout() {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { glow, typography, animations, spacing } = theme.custom;
  const isDark = theme.palette.mode === 'dark';
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const yearsOfExperience = new Date().getFullYear() - 2020;

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.5, ease: animations.easing.smooth } },
  };

  return (
    <Box
      component="section"
      id="about"
      sx={{ py: { xs: spacing.xxl, md: spacing.section }, position: 'relative', overflow: 'hidden' }}
    >
      {/* Rain streaks over glass */}
      {isDark && !prefersReducedMotion && Array.from({ length: 6 }).map((_, i) => (
        <Box key={`rain-${i}`} sx={{
          position: 'absolute', left: `${10 + i * 15}%`, width: 1, height: '15%',
          background: `linear-gradient(180deg, transparent, ${secondaryColor}10, transparent)`,
          animation: `${rainDrop} ${3.5 + i * 0.8}s linear ${i * 0.5}s infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <MotionBox variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>

          {/* ══════ LED TICKER TAPE ══════ */}
          <MotionBox variants={itemVariants} sx={{
            mb: 2, py: 0.5, overflow: 'hidden',
            borderTop: `1px solid ${glow.secondaryGlow(0.08)}`,
            borderBottom: `1px solid ${glow.secondaryGlow(0.08)}`,
          }}>
            <Box sx={{ display: 'flex', whiteSpace: 'nowrap', animation: prefersReducedMotion ? 'none' : `${tickerScroll} 30s linear infinite` }}>
              {[1,2].map(n => (
                <Typography key={n} component="span" sx={{
                  fontFamily: typography.fonts.label, fontSize: '0.55rem', color: 'secondary.main',
                  letterSpacing: typography.spacing.superLoose, opacity: 0.35, px: 2,
                }}>
                  {'/// NEURAL_LINK ACTIVE /// PROFILE_DATA LOADED /// IDENTITY_MATRIX VERIFIED /// SIGNAL NOMINAL /// CLEARANCE: ALPHA /// SECTOR: FRONTEND '}
                </Typography>
              ))}
            </Box>
          </MotionBox>

          {/* ══════ SECTION HEADING ══════ */}
          <MotionBox variants={itemVariants} sx={{ mb: spacing.xl, textAlign: 'center' }}>
            <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.65rem', color: 'secondary.main', letterSpacing: typography.spacing.superLoose, mb: 0.5 }}>
              NRL-01
            </Typography>
            <Typography variant="h3" sx={{
              fontFamily: typography.fonts.primary, fontWeight: typography.weights.bold,
              background: theme.palette.gradient?.primary, backgroundClip: 'text',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              letterSpacing: typography.spacing.relaxed,
            }}>
              PROFILE_DATA
            </Typography>
            <Typography sx={{ fontFamily: typography.fonts.secondary, color: 'text.secondary', letterSpacing: typography.spacing.loose, mt: 0.5 }}>
              Identity Matrix
            </Typography>
          </MotionBox>

          {/* ═══════════════════════════════════════════
              UNIQUE LAYOUT: Full-width neon billboard
              - Top: giant "NEON SIGN" style name
              - Below: bio text in glass panel
              - Below: horizontal power-meter bar
              - Below: strength cards as neon tube signs
              ═══════════════════════════════════════════ */}

          {/* NEON BILLBOARD NAME SIGN */}
          <MotionBox variants={itemVariants} sx={{
            textAlign: 'center', mb: 4, py: 4, px: 2,
            border: '2px solid', borderColor: glow.primaryGlow(0.12), borderRadius: '8px',
            position: 'relative', overflow: 'hidden',
            bgcolor: isDark ? 'rgba(10,10,15,0.5)' : 'rgba(235,235,245,0.4)',
          }}>
            {/* Fake rivets on the sign */}
            {[{ top: 8, left: 8 }, { top: 8, right: 8 }, { bottom: 8, left: 8 }, { bottom: 8, right: 8 }].map((pos, i) => (
              <Box key={i} sx={{ position: 'absolute', ...pos, width: 6, height: 6, borderRadius: '50%', border: '1px solid', borderColor: glow.secondaryGlow(0.15) }} />
            ))}

            <Typography sx={{
              fontFamily: typography.fonts.label, fontSize: '0.55rem', color: 'text.secondary',
              letterSpacing: typography.spacing.superLoose, mb: 1, opacity: 0.4,
            }}>
              {'>'} DISPLAYING CITIZEN RECORD...
            </Typography>

            <Typography sx={{
              fontFamily: typography.fonts.primary, fontWeight: typography.weights.black,
              fontSize: { xs: '2rem', sm: '3rem', md: '3.8rem' },
              color: 'primary.main', lineHeight: 1,
              animation: prefersReducedMotion ? 'none' : `${neonBuzz} 5s ease-in-out infinite`,
              letterSpacing: typography.spacing.relaxed,
            }}>
              {personalInfo.name.toUpperCase()}
            </Typography>

            <Typography sx={{
              fontFamily: typography.fonts.secondary, fontSize: '1rem',
              color: 'secondary.main', mt: 1, letterSpacing: typography.spacing.loose,
              fontWeight: typography.weights.medium,
            }}>
              {personalInfo.title}
            </Typography>

            <Typography sx={{
              fontFamily: typography.fonts.label, fontSize: '0.5rem', color: 'text.secondary',
              letterSpacing: typography.spacing.extraLoose, mt: 1.5, opacity: 0.3,
            }}>
              SECTOR: {personalInfo.location.toUpperCase()} // STATUS: ACTIVE
            </Typography>
          </MotionBox>

          {/* BIO PANEL — neon-glass with terminal prompt */}
          <MotionBox variants={itemVariants} sx={{
            mb: 4, position: 'relative',
            bgcolor: isDark ? 'rgba(12,12,20,0.6)' : 'rgba(240,240,248,0.7)',
            border: '1px solid', borderColor: glow.secondaryGlow(0.12),
            borderRadius: '6px', backdropFilter: 'blur(8px)',
          }}>
            {/* Neon top edge */}
            <Box sx={{
              position: 'absolute', top: 0, left: '10%', right: '10%', height: 2,
              background: `linear-gradient(90deg, transparent, ${secondaryColor}, transparent)`,
              boxShadow: `0 0 12px ${glow.secondaryGlow(0.3)}`, borderRadius: 1,
            }} />

            <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
              <Typography sx={{
                fontFamily: typography.fonts.label, fontSize: '0.55rem', color: 'secondary.main',
                letterSpacing: typography.spacing.extraLoose, mb: 1.5, opacity: 0.6,
              }}>
                root@neural-link:~$ cat /usr/share/profile.txt
              </Typography>
              <Typography sx={{
                fontFamily: typography.fonts.secondary, fontSize: '1rem', color: 'text.primary',
                lineHeight: 1.9, maxWidth: 800,
              }}>
                {personalInfo.summary}
              </Typography>
            </Box>
          </MotionBox>

          {/* ELECTRIC POWER METER — runtime years */}
          <MotionBox variants={itemVariants} sx={{ mb: 5 }}>
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: 3,
              p: 2.5, bgcolor: isDark ? 'rgba(12,12,20,0.4)' : 'rgba(240,240,248,0.5)',
              border: '1px solid', borderColor: glow.primaryGlow(0.1), borderRadius: '6px',
            }}>
              {/* Big number */}
              <Box sx={{ textAlign: 'center', flexShrink: 0, minWidth: 80 }}>
                <Typography sx={{
                  fontFamily: typography.fonts.primary, fontWeight: typography.weights.black,
                  fontSize: '2.8rem', color: 'primary.main', lineHeight: 1,
                  textShadow: `0 0 12px ${glow.primaryGlow(0.3)}`,
                }}>
                  {yearsOfExperience}+
                </Typography>
                <Typography sx={{
                  fontFamily: typography.fonts.label, fontSize: '0.6rem', color: 'text.secondary',
                  letterSpacing: typography.spacing.superLoose, opacity: 0.5,
                }}>
                  YRS RUNTIME
                </Typography>
              </Box>

              {/* Power bar */}
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.5rem', color: 'text.secondary', opacity: 0.4 }}>
                    POWER LEVEL
                  </Typography>
                  <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.5rem', color: 'primary.main', opacity: 0.7 }}>
                    {Math.min(yearsOfExperience * 10, 100)}%
                  </Typography>
                </Box>
                <Box sx={{
                  height: 12, borderRadius: '3px', overflow: 'hidden',
                  bgcolor: isDark ? 'rgba(255,45,107,0.06)' : 'rgba(255,45,107,0.03)',
                  border: '1px solid', borderColor: glow.primaryGlow(0.1),
                  position: 'relative',
                }}>
                  <MotionBox
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min(yearsOfExperience * 10, 100)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: prefersReducedMotion ? 0 : 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    sx={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}BB)`,
                      boxShadow: `0 0 10px ${glow.primaryGlow(0.25)}`,
                      borderRadius: '2px',
                      position: 'relative',
                      // Spark at tip
                      '&::after': {
                        content: '""', position: 'absolute', right: -3, top: '50%',
                        transform: 'translateY(-50%)', width: 6, height: 6, borderRadius: '50%',
                        bgcolor: '#FFF', boxShadow: `0 0 8px ${primaryColor}`,
                        animation: prefersReducedMotion ? 'none' : `${powerSpark} 1s ease-in-out infinite`,
                      },
                    }}
                  />
                </Box>
                {/* Tick marks */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.3 }}>
                  {[0, 25, 50, 75, 100].map(v => (
                    <Typography key={v} sx={{ fontFamily: typography.fonts.label, fontSize: '0.4rem', color: 'text.secondary', opacity: 0.25 }}>
                      {v}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </MotionBox>

          {/* NEON SIGN STRENGTH CARDS — horizontal row, not 2-column grid */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
            {strengths.map((strength, i) => {
              const color = i === 0 ? primaryColor : secondaryColor;
              const glowFn = i === 0 ? glow.primaryGlow : glow.secondaryGlow;
              return (
                <MotionBox
                  key={i}
                  variants={itemVariants}
                  whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.01 }}
                  sx={{
                    flex: 1, position: 'relative',
                    p: 3, borderRadius: '6px',
                    bgcolor: isDark ? 'rgba(12,12,20,0.5)' : 'rgba(240,240,248,0.6)',
                    border: '1px solid', borderColor: glowFn(0.15),
                    transition: 'all 0.15s ease', cursor: 'default', overflow: 'hidden',
                    '&:hover': {
                      borderColor: glowFn(0.4),
                      boxShadow: `0 0 24px ${glowFn(0.12)}, inset 0 0 24px ${glowFn(0.03)}`,
                    },
                  }}
                >
                  {/* Neon tube left edge */}
                  <Box sx={{
                    position: 'absolute', left: 0, top: '15%', bottom: '15%', width: 3,
                    bgcolor: color, borderRadius: '0 2px 2px 0',
                    boxShadow: `0 0 10px ${glowFn(0.4)}, 0 0 20px ${glowFn(0.15)}`,
                    opacity: 0.7,
                  }} />

                  <Typography sx={{
                    fontFamily: typography.fonts.label, fontSize: '0.5rem', color: 'text.secondary',
                    letterSpacing: typography.spacing.superLoose, mb: 1, opacity: 0.4, pl: 1.5,
                  }}>
                    MODULE {String(i + 1).padStart(2, '0')}
                  </Typography>

                  <Typography sx={{
                    fontFamily: typography.fonts.primary, fontWeight: typography.weights.semiBold,
                    fontSize: '1rem', color, mb: 1, pl: 1.5,
                    textShadow: `0 0 8px ${glowFn(0.25)}`,
                  }}>
                    {strength.title}
                  </Typography>

                  <Typography sx={{
                    fontFamily: typography.fonts.secondary, fontSize: '0.85rem',
                    color: 'text.secondary', lineHeight: 1.7, pl: 1.5,
                  }}>
                    {strength.description}
                  </Typography>
                </MotionBox>
              );
            })}
          </Stack>

        </MotionBox>
      </Container>

      <ThemedSectionDivider variant="circuit" />
    </Box>
  );
}
