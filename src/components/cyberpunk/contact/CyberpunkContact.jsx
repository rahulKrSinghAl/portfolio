import {
  Box,
  Container,
  Typography,
  Stack,
} from '@mui/material';
import {
  Email,
  LinkedIn,
  Phone,
  LocationOn,
  EmojiEvents,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { motion } from 'framer-motion';
import { personalInfo, education, achievements } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

const MotionBox = motion.create(Box);

const neonFlicker = keyframes`
  0%, 100% { opacity: 1; text-shadow: 0 0 8px currentColor, 0 0 16px currentColor; }
  5% { opacity: 0.4; text-shadow: 0 0 2px currentColor; }
  10% { opacity: 1; text-shadow: 0 0 8px currentColor, 0 0 16px currentColor; }
  15% { opacity: 0.7; text-shadow: 0 0 4px currentColor; }
  20%, 80% { opacity: 1; text-shadow: 0 0 8px currentColor, 0 0 16px currentColor; }
  85% { opacity: 0.5; text-shadow: 0 0 3px currentColor; }
  90% { opacity: 1; text-shadow: 0 0 8px currentColor, 0 0 16px currentColor; }
`;

const dataPulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

const signalWave = keyframes`
  0% { transform: scaleX(0); opacity: 1; }
  100% { transform: scaleX(1); opacity: 0; }
`;

const contactChannels = [
  { icon: Email, label: 'EMAIL_PORT', value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: '#FF2D6B', port: '25' },
  { icon: Phone, label: 'VOICE_LINK', value: personalInfo.phone, href: `tel:${personalInfo.phone}`, color: '#00F0FF', port: '80' },
  { icon: LinkedIn, label: 'NET_NODE', value: 'LinkedIn', href: personalInfo.linkedin, color: '#B026FF', port: '443' },
  { icon: LocationOn, label: 'GEO_PING', value: personalInfo.location, href: null, color: '#FFE500', port: '---' },
];

export default function CyberpunkContact() {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { glow, typography, animations, spacing } = theme.custom;
  const isDark = theme.palette.mode === 'dark';
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.5, ease: animations.easing.smooth } },
  };

  return (
    <Box component="section" id="contact"
      sx={{ py: { xs: spacing.xxl, md: spacing.section }, position: 'relative' }}
    >
      <Container maxWidth="lg">
        <MotionBox variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>

          {/* Section Header */}
          <MotionBox variants={itemVariants} sx={{ mb: spacing.xxl, textAlign: 'center' }}>
            <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.65rem', color: 'secondary.main', letterSpacing: typography.spacing.superLoose, mb: 0.5 }}>
              UPL-06
            </Typography>
            <Typography variant="h3" sx={{
              fontFamily: typography.fonts.primary, fontWeight: typography.weights.bold,
              background: theme.palette.gradient?.primary, backgroundClip: 'text',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              letterSpacing: typography.spacing.relaxed,
            }}>
              UPLINK
            </Typography>
            <Typography sx={{ fontFamily: typography.fonts.secondary, color: 'text.secondary', letterSpacing: typography.spacing.loose, mt: 0.5 }}>
              Connection Ports
            </Typography>
          </MotionBox>

          {/* ════════════════════════════════════════════
              UNIQUE: Full-width connection terminal
              - Flickering neon header sign
              - Horizontal data-port grid (2x2)
              - Each port is a self-contained neon panel
              - NOT a left/right Grid split like Vintage
              ════════════════════════════════════════════ */}

          {/* Flickering OPEN CHANNEL neon sign */}
          <MotionBox variants={itemVariants} sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{
              display: 'inline-block', px: 5, py: 1.5,
              border: '2px solid', borderColor: glow.primaryGlow(0.25),
              borderRadius: '4px', position: 'relative',
              bgcolor: isDark ? 'rgba(255,45,107,0.03)' : 'rgba(255,45,107,0.02)',
            }}>
              {/* Interference line */}
              <Box sx={{
                position: 'absolute', top: '50%', left: 0, right: 0, height: 1,
                background: `linear-gradient(90deg, transparent 20%, ${primaryColor}15 50%, transparent 80%)`,
                transform: 'translateY(-50%)',
              }} />
              <Typography sx={{
                fontFamily: typography.fonts.primary, fontWeight: typography.weights.bold,
                fontSize: { xs: '1.2rem', md: '1.6rem' }, color: 'primary.main',
                animation: prefersReducedMotion ? 'none' : `${neonFlicker} 4s ease-in-out infinite`,
                letterSpacing: typography.spacing.superLoose,
              }}>
                OPEN CHANNEL
              </Typography>
            </Box>
          </MotionBox>

          {/* Connection terminal housing */}
          <MotionBox variants={itemVariants} sx={{
            border: '1px solid', borderColor: glow.secondaryGlow(0.1),
            borderRadius: '8px', overflow: 'hidden',
            bgcolor: isDark ? 'rgba(12,12,20,0.5)' : 'rgba(240,240,248,0.6)',
            position: 'relative',
          }}>
            {/* Terminal header bar */}
            <Box sx={{
              px: 3, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderBottom: '1px solid', borderColor: glow.secondaryGlow(0.06),
              bgcolor: isDark ? 'rgba(0,240,255,0.03)' : 'rgba(0,184,196,0.02)',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#39FF14', boxShadow: '0 0 4px #39FF1450' }} />
                <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.5rem', color: 'text.secondary', letterSpacing: typography.spacing.loose, opacity: 0.5 }}>
                  UPLINK_TERMINAL // ALL PORTS ACTIVE
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.45rem', color: 'secondary.main', opacity: 0.4 }}>
                SIGNAL: NOMINAL
              </Typography>
            </Box>

            {/* Data ports — 2x2 grid of neon-bordered port panels */}
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 0,
            }}>
              {contactChannels.map((channel, i) => {
                const Icon = channel.icon;
                const isLink = !!channel.href;
                const isRight = i % 2 === 1;
                const isBottom = i >= 2;
                return (
                  <Box
                    key={i}
                    component={isLink ? 'a' : 'div'}
                    href={isLink ? channel.href : undefined}
                    target={channel.href?.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    sx={{
                      p: { xs: 2.5, md: 3 },
                      textDecoration: 'none', color: 'inherit',
                      borderRight: { xs: 'none', sm: isRight ? 'none' : '1px solid' },
                      borderBottom: isBottom ? 'none' : '1px solid',
                      borderColor: glow.secondaryGlow(0.06),
                      transition: 'all 0.15s ease',
                      position: 'relative', overflow: 'hidden',
                      cursor: isLink ? 'pointer' : 'default',
                      '&:hover': isLink ? {
                        bgcolor: `${channel.color}06`,
                        '& .port-indicator': {
                          animation: `${dataPulse} 0.6s ease-in-out infinite`,
                        },
                        '& .signal-wave': {
                          animation: `${signalWave} 0.8s ease-out`,
                        },
                      } : {},
                    }}
                  >
                    {/* Signal wave on hover */}
                    <Box className="signal-wave" sx={{
                      position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                      bgcolor: channel.color, opacity: 0, transformOrigin: 'left',
                    }} />

                    {/* Port number label */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Typography sx={{
                        fontFamily: typography.fonts.label, fontSize: '0.45rem',
                        color: 'text.secondary', letterSpacing: typography.spacing.superLoose, opacity: 0.35,
                      }}>
                        PORT:{channel.port}
                      </Typography>
                      {/* Status LED */}
                      <Box className="port-indicator" sx={{
                        width: 5, height: 5, borderRadius: '50%',
                        bgcolor: isLink ? '#39FF14' : channel.color,
                        boxShadow: `0 0 4px ${isLink ? '#39FF14' : channel.color}50`,
                        opacity: 0.6,
                      }} />
                    </Box>

                    {/* Icon + data */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{
                        width: 48, height: 48,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1px solid', borderColor: `${channel.color}30`,
                        borderRadius: '6px', bgcolor: `${channel.color}08`,
                        flexShrink: 0,
                      }}>
                        <Icon sx={{ fontSize: 22, color: channel.color }} />
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{
                          fontFamily: typography.fonts.label, fontSize: '0.5rem', color: channel.color,
                          letterSpacing: typography.spacing.extraLoose, mb: 0.3, opacity: 0.8,
                        }}>
                          {channel.label}
                        </Typography>
                        <Typography sx={{
                          fontFamily: typography.fonts.secondary, fontSize: '0.85rem',
                          color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {channel.value}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </MotionBox>

          {/* ════════════════════════════════════════════
              INLINE STATUS BAR: Education + Achievement
              - Single horizontal bar, NOT a stacked sidebar
              - Education as a data record, Achievement as notification
              ════════════════════════════════════════════ */}

          <MotionBox variants={itemVariants} sx={{ mt: 3 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
              {/* Education — data record panel */}
              <Box sx={{
                flex: 1, position: 'relative',
                border: '1px solid', borderColor: glow.secondaryGlow(0.1),
                borderRadius: '6px', overflow: 'hidden',
                bgcolor: isDark ? 'rgba(12,12,20,0.4)' : 'rgba(240,240,248,0.5)',
              }}>
                {/* Neon accent top edge */}
                <Box sx={{
                  position: 'absolute', top: 0, left: '15%', right: '15%', height: 2,
                  background: `linear-gradient(90deg, transparent, ${secondaryColor}, transparent)`,
                  boxShadow: `0 0 8px ${glow.secondaryGlow(0.2)}`, borderRadius: 1,
                }} />

                <Box sx={{ p: 2.5 }}>
                  <Typography sx={{
                    fontFamily: typography.fonts.label, fontSize: '0.45rem', color: 'secondary.main',
                    letterSpacing: typography.spacing.superLoose, mb: 1.5, opacity: 0.5,
                  }}>
                    {'>'} CERTIFICATION_DATA
                  </Typography>

                  <Typography sx={{
                    fontFamily: typography.fonts.primary, fontWeight: typography.weights.bold,
                    fontSize: '1.1rem', color: 'text.primary', mb: 0.3, lineHeight: 1.2,
                  }}>
                    {education.degree}
                  </Typography>
                  <Typography sx={{
                    fontFamily: typography.fonts.secondary, fontSize: '0.85rem', color: 'secondary.main', mb: 1,
                  }}>
                    {education.institution}
                  </Typography>

                  {/* Data fields as key:value pairs */}
                  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <Box>
                      <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.4rem', color: 'text.secondary', opacity: 0.4, letterSpacing: typography.spacing.loose }}>
                        PERIOD
                      </Typography>
                      <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.6rem', color: 'text.secondary', opacity: 0.7 }}>
                        {education.period}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.4rem', color: 'text.secondary', opacity: 0.4, letterSpacing: typography.spacing.loose }}>
                        SECTOR
                      </Typography>
                      <Typography sx={{ fontFamily: typography.fonts.label, fontSize: '0.6rem', color: 'text.secondary', opacity: 0.7 }}>
                        {education.location}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Achievement — system notification panel */}
              {achievements.map((ach, i) => (
                <Box key={i} sx={{
                  flex: 1, position: 'relative',
                  border: '1px solid', borderColor: glow.primaryGlow(0.12),
                  borderRadius: '6px', overflow: 'hidden',
                  bgcolor: isDark ? 'rgba(12,12,20,0.4)' : 'rgba(240,240,248,0.5)',
                }}>
                  {/* Neon accent top — yellow for achievement */}
                  <Box sx={{
                    position: 'absolute', top: 0, left: '15%', right: '15%', height: 2,
                    background: 'linear-gradient(90deg, transparent, #FFE500, transparent)',
                    boxShadow: '0 0 8px rgba(255,229,0,0.2)', borderRadius: 1,
                  }} />

                  <Box sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                      <Box sx={{
                        width: 32, height: 32, borderRadius: '4px',
                        border: '1px solid', borderColor: 'rgba(255,229,0,0.25)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        bgcolor: 'rgba(255,229,0,0.06)',
                      }}>
                        <EmojiEvents sx={{ fontSize: 16, color: '#FFE500' }} />
                      </Box>
                      <Typography sx={{
                        fontFamily: typography.fonts.label, fontSize: '0.45rem', color: '#FFE500',
                        letterSpacing: typography.spacing.superLoose, opacity: 0.7,
                      }}>
                        ACHIEVEMENT UNLOCKED
                      </Typography>
                    </Box>

                    <Typography sx={{
                      fontFamily: typography.fonts.primary, fontWeight: typography.weights.semiBold,
                      fontSize: '0.95rem', color: 'text.primary', mb: 0.5,
                    }}>
                      {ach.title}
                    </Typography>
                    <Typography sx={{
                      fontFamily: typography.fonts.secondary, fontSize: '0.82rem',
                      color: 'text.secondary', lineHeight: 1.6,
                    }}>
                      {ach.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </MotionBox>

          {/* Electric colophon footer */}
          <MotionBox variants={itemVariants} sx={{
            mt: spacing.xxl, textAlign: 'center', pt: 4,
            borderTop: '1px solid', borderColor: glow.primaryGlow(0.06),
          }}>
            <Typography sx={{
              fontFamily: typography.fonts.label, fontSize: '0.55rem', color: 'text.secondary',
              letterSpacing: typography.spacing.extraLoose, opacity: 0.5,
            }}>
              {'/// '} COMPILED BY {personalInfo.name.toUpperCase()} {' ///'}
            </Typography>
            <Typography sx={{
              fontFamily: typography.fonts.label, fontSize: '0.5rem', color: 'text.secondary',
              letterSpacing: typography.spacing.loose, mt: 0.5, opacity: 0.3,
            }}>
              CYBERPUNK NEON v4.0 — {new Date().getFullYear()}
            </Typography>
          </MotionBox>

        </MotionBox>
      </Container>
    </Box>
  );
}
