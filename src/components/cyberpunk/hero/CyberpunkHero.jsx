import { useRef } from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { personalInfo } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { Logo } from '../../shared';

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

const glitchFlicker = keyframes`
  0%, 88%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
  90% { clip-path: inset(40% 0 20% 0); transform: translate(-4px, 2px); }
  92% { clip-path: inset(10% 0 60% 0); transform: translate(4px, -2px); }
  94% { clip-path: inset(70% 0 5% 0); transform: translate(-2px, 0); }
  96% { clip-path: inset(20% 0 50% 0); transform: translate(3px, 1px); }
  98% { clip-path: inset(50% 0 15% 0); transform: translate(-1px, -1px); }
`;

const neonBorderPulse = keyframes`
  0%, 100% { box-shadow: 0 0 15px rgba(255,45,107,0.15), 0 0 30px rgba(255,45,107,0.05), inset 0 0 15px rgba(0,240,255,0.05); }
  50% { box-shadow: 0 0 25px rgba(0,240,255,0.2), 0 0 50px rgba(0,240,255,0.08), inset 0 0 25px rgba(255,45,107,0.08); }
`;

const scanlinePass = keyframes`
  0% { top: -20%; }
  100% { top: 120%; }
`;

const bootLine = keyframes`
  0% { width: 0; opacity: 0; }
  5% { opacity: 1; }
  100% { width: 100%; opacity: 1; }
`;

const dataRain = keyframes`
  0% { transform: translateY(-100%); opacity: 0; }
  10% { opacity: 0.5; }
  90% { opacity: 0.5; }
  100% { transform: translateY(500%); opacity: 0; }
`;

// Barcode SVG decoration
function Barcode({ color, width = 120 }) {
  const bars = [3,1,2,1,3,2,1,1,3,1,2,3,1,2,1,3,1,2,1,1,3,2,1,3,1,2,1,1,3,2];
  return (
    <svg width={width} height="24" viewBox={`0 0 ${bars.length * 3} 24`}>
      {bars.map((w, i) => (
        <rect key={i} x={i * 3} y={0} width={w} height="24" fill={color} opacity={0.4} />
      ))}
    </svg>
  );
}

export default function CyberpunkHero() {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);
  const cardRef = useRef(null);

  const { glow, typography, animations, spacing } = theme.custom;
  const isDark = theme.palette.mode === 'dark';
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12, delayChildren: prefersReducedMotion ? 0 : 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.5, ease: animations.easing.smooth } },
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: spacing.xl, md: 0 },
      }}
    >
      {/* Data rain columns in background */}
      {!prefersReducedMotion && [0,1,2,3,4,5,6,7].map((i) => (
        <Box key={`rain-${i}`} sx={{
          position: 'absolute',
          left: `${8 + i * 12}%`,
          top: 0,
          width: 1,
          height: '20%',
          background: `linear-gradient(180deg, transparent, ${i % 2 === 0 ? primaryColor : secondaryColor}15, transparent)`,
          animation: `${dataRain} ${5 + i * 1.5}s linear ${i * 0.6}s infinite`,
          pointerEvents: 'none',
          zIndex: 0,
        }} />
      ))}

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <MotionBox style={{ y, opacity }}>
          {/* === HOLOGRAPHIC ID CARD — single centered card with 3D tilt === */}
          <MotionBox
            ref={cardRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            sx={{
              position: 'relative',
              mx: 'auto',
              maxWidth: 560,
              p: { xs: 3, md: 4 },
              border: '1px solid',
              borderColor: glow.primaryGlow(0.25),
              borderRadius: '8px',
              bgcolor: isDark ? 'rgba(12, 12, 20, 0.7)' : 'rgba(235, 235, 245, 0.75)',
              backdropFilter: 'blur(16px)',
              animation: prefersReducedMotion ? 'none' : `${neonBorderPulse} 4s ease-in-out infinite`,
              transform: { xs: 'none', md: 'perspective(1200px) rotateY(-3deg) rotateX(2deg)' },
              transition: 'transform 0.4s ease',
              '&:hover': {
                transform: { xs: 'none', md: 'perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1.02)' },
              },
            }}
          >
            {/* Scanline sweep */}
            <Box sx={{
              position: 'absolute', left: 0, right: 0, height: '40%',
              background: `linear-gradient(180deg, transparent, ${glow.secondaryGlow(0.04)}, transparent)`,
              animation: prefersReducedMotion ? 'none' : `${scanlinePass} 3.5s linear infinite`,
              pointerEvents: 'none', zIndex: 10,
            }} />

            {/* Scanline texture */}
            <Box sx={{
              position: 'absolute', inset: 0, borderRadius: '8px',
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${isDark ? 'rgba(255,255,255,0.012)' : 'rgba(0,0,0,0.006)'} 2px, ${isDark ? 'rgba(255,255,255,0.012)' : 'rgba(0,0,0,0.006)'} 4px)`,
              pointerEvents: 'none', zIndex: 5,
            }} />

            {/* Corner neon brackets */}
            {[
              { top: -1, left: -1, borderTop: '2px solid', borderLeft: '2px solid' },
              { top: -1, right: -1, borderTop: '2px solid', borderRight: '2px solid' },
              { bottom: -1, left: -1, borderBottom: '2px solid', borderLeft: '2px solid' },
              { bottom: -1, right: -1, borderBottom: '2px solid', borderRight: '2px solid' },
            ].map((style, i) => (
              <Box key={i} sx={{
                position: 'absolute', ...style, width: 20, height: 20,
                borderColor: i < 2 ? primaryColor : secondaryColor,
                opacity: 0.5, zIndex: 6,
              }} />
            ))}

            {/* Top row: ID label + barcode */}
            <MotionBox variants={itemVariants} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography sx={{
                  fontFamily: typography.fonts.label, fontSize: '0.5rem',
                  color: 'secondary.main', letterSpacing: typography.spacing.superLoose, opacity: 0.6,
                }}>
                  CITIZEN://ID_CARD
                </Typography>
                <Typography sx={{
                  fontFamily: typography.fonts.label, fontSize: '0.45rem',
                  color: 'text.secondary', letterSpacing: typography.spacing.extraLoose, opacity: 0.4,
                }}>
                  RS-2020-FE-LEAD // CLEARANCE: ALPHA
                </Typography>
              </Box>
              <Box sx={{ opacity: 0.4 }}>
                <Barcode color={isDark ? secondaryColor : theme.palette.text.secondary} width={90} />
              </Box>
            </MotionBox>

            {/* Logo + Name row */}
            <MotionBox variants={itemVariants} sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
              <Box sx={{
                flexShrink: 0, width: 72, height: 72,
                border: '1px solid', borderColor: glow.primaryGlow(0.2), borderRadius: '4px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                bgcolor: glow.primaryGlow(0.03),
              }}>
                <Logo size={56} showGlow />
              </Box>
              <Box>
                {/* Name with glitch on hover */}
                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: typography.fonts.primary,
                    fontWeight: typography.weights.bold,
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.6rem' },
                    color: 'text.primary',
                    lineHeight: 1.1,
                    letterSpacing: typography.spacing.tight,
                    cursor: 'default',
                    '&:hover': {
                      animation: prefersReducedMotion ? 'none' : `${glitchFlicker} 0.5s ease-in-out`,
                    },
                  }}
                >
                  {personalInfo.name}
                </Typography>
                <Typography sx={{
                  fontFamily: typography.fonts.secondary, fontSize: '0.85rem',
                  color: 'text.secondary', letterSpacing: typography.spacing.relaxed, mt: 0.3,
                  fontWeight: typography.weights.medium,
                }}>
                  FRONTEND ARCHITECT // REACT SPECIALIST
                </Typography>
              </Box>
            </MotionBox>

            {/* Boot sequence line */}
            <MotionBox variants={itemVariants} sx={{
              mb: 3, py: 1, borderTop: '1px solid', borderBottom: '1px solid',
              borderColor: glow.secondaryGlow(0.08),
            }}>
              <Box sx={{
                display: 'flex', alignItems: 'center', gap: 1, mb: 0.5,
              }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#39FF14', boxShadow: '0 0 6px #39FF1460' }} />
                <Typography sx={{
                  fontFamily: typography.fonts.label, fontSize: '0.6rem',
                  color: 'secondary.main', letterSpacing: typography.spacing.loose, opacity: 0.8,
                }}>
                  SYSTEM://ONLINE
                </Typography>
              </Box>
              <Box sx={{ overflow: 'hidden' }}>
                <Box sx={{
                  height: 2, bgcolor: secondaryColor, opacity: 0.3, borderRadius: 1,
                  animation: prefersReducedMotion ? 'none' : `${bootLine} 2s ease-out 0.5s both`,
                }} />
              </Box>
            </MotionBox>

            {/* Typing terminal */}
            <MotionBox variants={itemVariants} sx={{
              mb: 3, p: 1.5, bgcolor: isDark ? 'rgba(0,240,255,0.03)' : 'rgba(176,38,255,0.02)',
              borderLeft: '2px solid', borderColor: 'secondary.main', borderRadius: '0 4px 4px 0',
              minHeight: 32,
            }}>
              <TypeAnimation
                sequence={[
                  '> Compiling scalable React systems...', 2000,
                  '> Deploying production interfaces...', 2000,
                  '> Optimizing runtime performance...', 2000,
                  '> Leading frontend operations...', 2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{
                  fontFamily: typography.fonts.label, fontSize: '0.82rem',
                  color: theme.palette.secondary.main,
                }}
              />
            </MotionBox>

            {/* CTAs */}
            <MotionBox variants={itemVariants}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  sx={{
                    bgcolor: 'primary.main', color: '#FFF',
                    fontFamily: typography.fonts.secondary, fontWeight: typography.weights.semiBold,
                    letterSpacing: typography.spacing.relaxed, px: 3.5, py: 1.2, borderRadius: '3px',
                    textTransform: 'uppercase', fontSize: '0.82rem',
                    '&:hover': { bgcolor: 'primary.dark', boxShadow: `0 0 20px ${glow.primaryGlow(0.4)}` },
                  }}
                >
                  Initialize Uplink
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                  sx={{
                    borderColor: 'secondary.main', color: 'secondary.main',
                    fontFamily: typography.fonts.secondary, fontWeight: typography.weights.semiBold,
                    letterSpacing: typography.spacing.relaxed, px: 3.5, py: 1.2, borderRadius: '3px',
                    textTransform: 'uppercase', fontSize: '0.82rem',
                    '&:hover': { bgcolor: glow.secondaryGlow(0.08), borderColor: 'secondary.light', boxShadow: `0 0 16px ${glow.secondaryGlow(0.2)}` },
                  }}
                >
                  Access Runtime Log
                </Button>
              </Stack>
            </MotionBox>

            {/* Bottom info bar */}
            <MotionBox variants={itemVariants} sx={{
              display: 'flex', justifyContent: 'space-between', mt: 3, pt: 1.5,
              borderTop: '1px solid', borderColor: glow.primaryGlow(0.06),
            }}>
              <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.45rem', color: 'text.secondary', opacity: 0.3, letterSpacing: typography.spacing.loose }}>
                {personalInfo.location}
              </Typography>
              <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.45rem', color: 'text.secondary', opacity: 0.3, letterSpacing: typography.spacing.loose }}>
                v4.0 // NEON_BUILD
              </Typography>
            </MotionBox>
          </MotionBox>

          {/* Scroll indicator */}
          <MotionBox
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 0.4 }}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}
          >
            <Box sx={{ width: 1, height: 30, background: `linear-gradient(180deg, ${primaryColor}40, transparent)` }} />
            <KeyboardArrowDown sx={{ color: 'primary.main', opacity: 0.4, fontSize: 20, filter: `drop-shadow(0 0 4px ${glow.primaryGlow(0.3)})` }} />
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}
