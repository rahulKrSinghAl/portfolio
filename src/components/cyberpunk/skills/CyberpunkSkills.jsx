import {
  Box,
  Container,
  Typography,
  Stack,
} from '@mui/material';
import { FaReact, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiNextdotjs, SiRedux, SiMui, SiJavascript, SiTypescript } from 'react-icons/si';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { skills, languages } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { ThemedSectionDivider } from '../../theme-decorative-bridge';

const MotionBox = motion.create(Box);

const skillIcons = {
  React: FaReact, 'Next.js': SiNextdotjs, Redux: SiRedux, MUI: SiMui,
  HTML: FaHtml5, CSS: FaCss3Alt, JavaScript: SiJavascript, TypeScript: SiTypescript,
};

const languageFills = { JavaScript: 90, TypeScript: 85 };

const crtFlicker = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.98; }
  50.5% { opacity: 0.94; }
  51% { opacity: 1; }
`;

const scanlineRoll = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
`;

export default function CyberpunkSkills() {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { glow, typography, animations, spacing } = theme.custom;
  const isDark = theme.palette.mode === 'dark';
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.4, ease: animations.easing.smooth } },
  };

  return (
    <Box component="section" id="skills"
      sx={{ py: { xs: spacing.xxl, md: spacing.section }, position: 'relative' }}
    >
      <Container maxWidth="lg">
        <MotionBox variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>

          {/* Section Header */}
          <MotionBox variants={itemVariants} sx={{ mb: spacing.xxl, textAlign: 'center' }}>
            <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.65rem', color: 'secondary.main', letterSpacing: typography.spacing.superLoose, mb: 0.5 }}>
              STK-03
            </Typography>
            <Typography variant="h3" sx={{
              fontFamily: typography.fonts.primary, fontWeight: typography.weights.bold,
              background: theme.palette.gradient?.primary, backgroundClip: 'text',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              letterSpacing: typography.spacing.relaxed,
            }}>
              TECH_STACK
            </Typography>
            <Typography sx={{ fontFamily: typography.fonts.secondary, color: 'text.secondary', letterSpacing: typography.spacing.loose, mt: 0.5 }}>
              Loaded Modules
            </Typography>
          </MotionBox>

          {/* ══════════════════════════════════════════
              UNIQUE: Single large CRT arcade cabinet
              - Not a 3-column grid of compartments
              - Full-width CRT screen with internal sections
              - Scanlines, curvature, CRT glow
              - Skill badges as "pixel art" insert cartridges
              - Loading bars are retro game health bars
              ══════════════════════════════════════════ */}

          {/* Arcade Cabinet Outer Shell */}
          <Box sx={{
            border: '3px solid', borderColor: isDark ? glow.secondaryGlow(0.15) : glow.secondaryGlow(0.1),
            borderRadius: '12px 12px 6px 6px',
            bgcolor: isDark ? 'rgba(8,8,14,0.6)' : 'rgba(235,235,245,0.5)',
            overflow: 'hidden', position: 'relative',
            boxShadow: isDark
              ? `0 0 40px rgba(0,0,0,0.3), inset 0 1px 0 ${glow.secondaryGlow(0.08)}`
              : '0 4px 20px rgba(0,0,0,0.05)',
          }}>
            {/* CRT bezel top */}
            <Box sx={{
              px: 3, py: 1.5,
              background: isDark
                ? `linear-gradient(180deg, rgba(0,240,255,0.06), rgba(0,240,255,0.02))`
                : `linear-gradient(180deg, rgba(0,184,196,0.04), transparent)`,
              borderBottom: '2px solid', borderColor: glow.secondaryGlow(0.08),
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#39FF14', boxShadow: '0 0 6px #39FF1460' }} />
                <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.65rem', color: 'secondary.main', letterSpacing: typography.spacing.extraLoose }}>
                  ARCADE_SKILL_MATRIX
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.5rem', color: 'text.secondary', opacity: 0.3 }}>
                INSERT COIN TO CONTINUE
              </Typography>
            </Box>

            {/* CRT Screen Area */}
            <Box sx={{
              position: 'relative', p: { xs: 2, md: 4 },
              animation: prefersReducedMotion ? 'none' : `${crtFlicker} 4s ease-in-out infinite`,
            }}>
              {/* Scanline overlay */}
              <Box sx={{
                position: 'absolute', inset: 0,
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${isDark ? 'rgba(0,240,255,0.008)' : 'rgba(0,0,0,0.003)'} 2px, ${isDark ? 'rgba(0,240,255,0.008)' : 'rgba(0,0,0,0.003)'} 4px)`,
                animation: prefersReducedMotion ? 'none' : `${scanlineRoll} 0.15s linear infinite`,
                pointerEvents: 'none', zIndex: 5,
              }} />
              {/* CRT vignette */}
              <Box sx={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.2) 100%)',
                pointerEvents: 'none', zIndex: 4,
              }} />

              <Box sx={{ position: 'relative', zIndex: 1 }}>

                {/* ─── CORE MODULES: Horizontal scrollable badges ─── */}
                <MotionBox variants={itemVariants} sx={{ mb: 4 }}>
                  <Typography sx={{
                    fontFamily: typography.fonts.label, fontSize: '0.6rem', color: 'secondary.main',
                    letterSpacing: typography.spacing.superLoose, mb: 2,
                    borderBottom: '1px solid', borderColor: glow.secondaryGlow(0.08), pb: 0.5,
                  }}>
                    {'>'} CORE_MODULES.loaded()
                  </Typography>

                  <Box sx={{
                    display: 'flex', flexWrap: 'wrap', gap: 2,
                  }}>
                    {skills.frontend.map((skill, idx) => {
                      const Icon = skillIcons[skill];
                      return (
                        <MotionBox
                          key={skill}
                          variants={itemVariants}
                          whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.05 }}
                          sx={{
                            display: 'flex', alignItems: 'center', gap: 1.5,
                            px: 2, py: 1.5,
                            bgcolor: isDark ? 'rgba(0,240,255,0.04)' : 'rgba(0,184,196,0.03)',
                            border: '1px solid', borderColor: glow.secondaryGlow(0.1),
                            borderRadius: '4px', cursor: 'default',
                            transition: 'all 0.12s ease',
                            minWidth: 130,
                            '&:hover': {
                              borderColor: glow.secondaryGlow(0.35),
                              boxShadow: `0 0 16px ${glow.secondaryGlow(0.08)}, inset 0 0 8px ${glow.secondaryGlow(0.03)}`,
                            },
                          }}
                        >
                          {Icon && <Icon size={24} color={secondaryColor} style={{ opacity: 0.8 }} />}
                          <Box>
                            <Typography sx={{ fontFamily: typography.fonts.secondary, fontSize: '0.85rem', color: 'text.primary', fontWeight: typography.weights.medium }}>
                              {skill}
                            </Typography>
                            <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.4rem', color: 'text.secondary', letterSpacing: typography.spacing.loose, opacity: 0.4 }}>
                              MODULE_{String(idx + 1).padStart(2, '0')}
                            </Typography>
                          </Box>
                        </MotionBox>
                      );
                    })}
                  </Box>
                </MotionBox>

                {/* ─── LANGUAGE RUNTIMES: Full-width loading bars ─── */}
                <MotionBox variants={itemVariants} sx={{ mb: 4 }}>
                  <Typography sx={{
                    fontFamily: typography.fonts.label, fontSize: '0.6rem', color: 'primary.main',
                    letterSpacing: typography.spacing.superLoose, mb: 2,
                    borderBottom: '1px solid', borderColor: glow.primaryGlow(0.08), pb: 0.5,
                  }}>
                    {'>'} LANGUAGE_RUNTIMES.status()
                  </Typography>

                  <Stack spacing={2.5}>
                    {skills.languages.map((lang) => {
                      const fill = languageFills[lang] || 75;
                      const LangIcon = skillIcons[lang];
                      return (
                        <Box key={lang}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.8 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {LangIcon && <LangIcon size={18} color={primaryColor} style={{ opacity: 0.7 }} />}
                              <Typography sx={{ fontFamily: typography.fonts.secondary, fontSize: '0.95rem', color: 'text.primary', fontWeight: typography.weights.medium }}>
                                {lang}
                              </Typography>
                            </Box>
                            <Typography sx={{
                              fontFamily: typography.fonts.primary, fontSize: '1rem', fontWeight: typography.weights.bold,
                              color: 'primary.main', textShadow: `0 0 6px ${glow.primaryGlow(0.25)}`,
                            }}>
                              {fill}%
                            </Typography>
                          </Box>
                          {/* Retro loading bar */}
                          <Box sx={{
                            height: 16, borderRadius: '3px', overflow: 'hidden',
                            bgcolor: isDark ? 'rgba(255,45,107,0.05)' : 'rgba(255,45,107,0.02)',
                            border: '1px solid', borderColor: glow.primaryGlow(0.1),
                            position: 'relative',
                          }}>
                            <MotionBox
                              initial={{ width: 0 }}
                              whileInView={{ width: `${fill}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                              sx={{
                                height: '100%',
                                background: `linear-gradient(90deg, ${primaryColor}DD, ${primaryColor})`,
                                boxShadow: `0 0 12px ${glow.primaryGlow(0.2)}`,
                                borderRadius: '2px',
                                // Retro segmented look
                                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.15) 8px, rgba(0,0,0,0.15) 10px)`,
                              }}
                            />
                          </Box>
                        </Box>
                      );
                    })}
                  </Stack>
                </MotionBox>

                {/* ─── PROTOCOL INTERFACES (Spoken Languages): Inline coin-slots ─── */}
                <MotionBox variants={itemVariants}>
                  <Typography sx={{
                    fontFamily: typography.fonts.label, fontSize: '0.6rem', color: '#B026FF',
                    letterSpacing: typography.spacing.superLoose, mb: 2,
                    borderBottom: '1px solid', borderColor: 'rgba(176,38,255,0.08)', pb: 0.5,
                  }}>
                    {'>'} PROTOCOL_INTERFACES.list()
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {languages.map((lang) => (
                      <MotionBox
                        key={lang.name}
                        variants={itemVariants}
                        whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                        sx={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          gap: 3, px: 2.5, py: 1.5, minWidth: 200, flex: '1 1 200px',
                          bgcolor: isDark ? 'rgba(176,38,255,0.04)' : 'rgba(176,38,255,0.02)',
                          border: '1px solid', borderColor: 'rgba(176,38,255,0.12)',
                          borderRadius: '4px', cursor: 'default', transition: 'all 0.12s ease',
                          position: 'relative', overflow: 'hidden',
                          // Coin slot left indicator
                          '&::before': {
                            content: '""', position: 'absolute', left: 0, top: '25%', bottom: '25%',
                            width: 3, bgcolor: '#B026FF', borderRadius: '0 2px 2px 0', opacity: 0.5,
                          },
                          '&:hover': { borderColor: 'rgba(176,38,255,0.3)', boxShadow: '0 0 12px rgba(176,38,255,0.06)' },
                        }}
                      >
                        <Box>
                          <Typography sx={{ fontFamily: typography.fonts.secondary, fontSize: '0.95rem', color: 'text.primary', fontWeight: typography.weights.medium }}>
                            {lang.name}
                          </Typography>
                          <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.45rem', color: 'text.secondary', letterSpacing: typography.spacing.loose, opacity: 0.5 }}>
                            {lang.level.toUpperCase()}
                          </Typography>
                        </Box>
                        <Box sx={{
                          px: 1.5, py: 0.3, border: '1px solid rgba(176,38,255,0.2)',
                          borderRadius: '2px', bgcolor: 'rgba(176,38,255,0.06)',
                        }}>
                          <Typography sx={{
                            fontFamily: typography.fonts.label, fontSize: '0.7rem', color: '#B026FF',
                            textShadow: '0 0 4px rgba(176,38,255,0.3)',
                          }}>
                            {lang.proficiency}%
                          </Typography>
                        </Box>
                      </MotionBox>
                    ))}
                  </Box>
                </MotionBox>
              </Box>
            </Box>

            {/* Arcade cabinet bottom — decorative controls */}
            <Box sx={{
              px: 3, py: 1.5,
              borderTop: '2px solid', borderColor: glow.secondaryGlow(0.06),
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3,
            }}>
              {/* Joystick */}
              <Box sx={{
                width: 16, height: 16, borderRadius: '50%', border: '1.5px solid', borderColor: glow.secondaryGlow(0.15),
                position: 'relative',
                '&::after': { content: '""', position: 'absolute', inset: '35%', borderRadius: '50%', bgcolor: secondaryColor, opacity: 0.3 },
              }} />
              {/* Buttons */}
              {[primaryColor, secondaryColor, '#B026FF'].map((c, i) => (
                <Box key={i} sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: c, opacity: 0.12, boxShadow: `0 0 4px ${c}30` }} />
              ))}
              <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.45rem', color: 'text.secondary', letterSpacing: typography.spacing.superLoose, opacity: 0.2, ml: 2 }}>
                CREDIT: {new Date().getFullYear()}
              </Typography>
            </Box>
          </Box>

        </MotionBox>
      </Container>

      <ThemedSectionDivider variant="glitch" />
    </Box>
  );
}
