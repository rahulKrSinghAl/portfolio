import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  Grid,
  Paper,
} from '@mui/material';
import {
  Email,
  LinkedIn,
  Phone,
  LocationOn,
  EmojiEvents,
  School,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { motion } from 'framer-motion';
import { personalInfo, education, achievements } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

const MotionBox = motion.create(Box);

const flapOpen = keyframes`
  0% { transform: rotateX(0deg); }
  100% { transform: rotateX(180deg); }
`;

const letterRise = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-30px); }
`;

const sealCrack = keyframes`
  0% { transform: scale(1) rotate(0deg); opacity: 1; }
  50% { transform: scale(1.1) rotate(5deg); opacity: 0.8; }
  100% { transform: scale(0.9) rotate(-3deg); opacity: 0.6; }
`;

const contactChannels = [
  { icon: Email, label: 'Post', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: Phone, label: 'Telegraph', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
  { icon: LinkedIn, label: 'Network', value: 'LinkedIn', href: personalInfo.linkedin },
  { icon: LocationOn, label: 'Coordinates', value: personalInfo.location, href: null },
];

export default function VintageContact() {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const { glow, typography, animations, spacing } = theme.custom;
  const isDark = theme.palette.mode === 'dark';
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.15, delayChildren: 0.1 },
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
      id="contact"
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
              CHAPTER VI
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
              Dispatch
            </Typography>
            <Typography sx={{
              fontFamily: typography.fonts.secondary,
              color: 'text.secondary',
              letterSpacing: typography.spacing.loose,
              mt: 0.5,
              fontStyle: 'italic',
            }}>
              Correspondence Office
            </Typography>
          </MotionBox>

          <Grid container spacing={4}>
            {/* LEFT: Envelope that opens */}
            <Grid size={{ xs: 12, md: 7 }}>
              <MotionBox variants={itemVariants}>
                {/* Envelope container */}
                <Box
                  onClick={() => setEnvelopeOpen(!envelopeOpen)}
                  sx={{
                    position: 'relative',
                    cursor: 'pointer',
                    perspective: '800px',
                    mb: 4,
                  }}
                >
                  {/* Envelope body */}
                  <Box sx={{
                    bgcolor: isDark ? 'rgba(44, 31, 14, 0.6)' : 'rgba(245, 230, 200, 0.8)',
                    border: '2px solid',
                    borderColor: glow.primaryGlow(0.2),
                    borderRadius: '2px',
                    minHeight: 280,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.5s ease',
                  }}>
                    {/* Envelope flap triangle */}
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 80,
                      background: isDark
                        ? 'linear-gradient(180deg, rgba(58, 43, 22, 0.9) 0%, transparent 100%)'
                        : 'linear-gradient(180deg, rgba(237, 217, 179, 0.9) 0%, transparent 100%)',
                      transformOrigin: 'top center',
                      transform: envelopeOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
                      transition: `transform ${animations.duration.slow}s ease`,
                      zIndex: envelopeOpen ? 0 : 3,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '120px solid transparent',
                        borderRight: '120px solid transparent',
                        borderTop: `60px solid ${isDark ? 'rgba(58, 43, 22, 0.5)' : 'rgba(237, 217, 179, 0.5)'}`,
                      },
                    }} />

                    {/* Wax seal on flap */}
                    <Box sx={{
                      position: 'absolute',
                      top: 50,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: 'secondary.main',
                      zIndex: 4,
                      display: envelopeOpen ? 'none' : 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 2px 8px ${glow.secondaryGlow(0.4)}`,
                      clipPath: 'polygon(50% 0%, 63% 5%, 75% 2%, 80% 14%, 93% 14%, 93% 27%, 100% 38%, 95% 48%, 100% 60%, 93% 70%, 93% 82%, 82% 86%, 75% 97%, 63% 93%, 50% 100%, 37% 93%, 25% 97%, 18% 86%, 7% 82%, 7% 70%, 0% 60%, 5% 48%, 0% 38%, 7% 27%, 7% 14%, 20% 14%, 25% 2%, 37% 5%)',
                    }}>
                      <Typography sx={{
                        fontFamily: typography.fonts.primary,
                        fontSize: '0.7rem',
                        fontWeight: typography.weights.bold,
                        color: '#FAF6EE',
                      }}>
                        RS
                      </Typography>
                    </Box>

                    {/* Letter content (rises out when open) */}
                    <Box sx={{
                      p: { xs: 3, md: 4 },
                      pt: envelopeOpen ? 3 : 12,
                      transform: envelopeOpen ? 'translateY(-20px)' : 'translateY(0)',
                      transition: `all ${animations.duration.slow}s ease`,
                      opacity: envelopeOpen ? 1 : 0.4,
                    }}>
                      {!envelopeOpen && (
                        <Typography sx={{
                          textAlign: 'center',
                          fontFamily: typography.fonts.secondary,
                          fontSize: '0.9rem',
                          color: 'text.secondary',
                          fontStyle: 'italic',
                          mt: 4,
                        }}>
                          Click to break the seal...
                        </Typography>
                      )}

                      {envelopeOpen && (
                        <>
                          <Typography sx={{
                            fontFamily: typography.fonts.label,
                            fontSize: '0.6rem',
                            color: 'primary.main',
                            letterSpacing: typography.spacing.superLoose,
                            mb: 2,
                          }}>
                            SEND CORRESPONDENCE
                          </Typography>

                          {/* Contact channels */}
                          <Stack spacing={2}>
                            {contactChannels.map((channel, i) => {
                              const Icon = channel.icon;
                              return (
                                <Box
                                  key={i}
                                  component={channel.href ? 'a' : 'div'}
                                  href={channel.href || undefined}
                                  target={channel.href?.startsWith('http') ? '_blank' : undefined}
                                  rel={channel.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    p: 1.5,
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    borderBottom: '1px dotted',
                                    borderColor: glow.primaryGlow(0.1),
                                    transition: 'all 0.3s ease',
                                    '&:hover': channel.href ? {
                                      bgcolor: glow.primaryGlow(0.05),
                                      borderColor: glow.primaryGlow(0.2),
                                    } : {},
                                  }}
                                >
                                  {/* Postage stamp style icon button */}
                                  <Box sx={{
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid',
                                    borderColor: glow.primaryGlow(0.2),
                                    borderRadius: '2px',
                                    bgcolor: glow.primaryGlow(0.05),
                                  }}>
                                    <Icon sx={{ fontSize: 18, color: 'primary.main' }} />
                                  </Box>

                                  <Box>
                                    <Typography sx={{
                                      fontFamily: typography.fonts.label,
                                      fontSize: '0.5rem',
                                      color: 'text.secondary',
                                      letterSpacing: typography.spacing.extraLoose,
                                    }}>
                                      {channel.label}
                                    </Typography>
                                    <Typography sx={{
                                      fontFamily: typography.fonts.secondary,
                                      fontSize: '0.85rem',
                                      color: 'text.primary',
                                      wordBreak: 'break-all',
                                    }}>
                                      {channel.value}
                                    </Typography>
                                  </Box>
                                </Box>
                              );
                            })}
                          </Stack>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              </MotionBox>
            </Grid>

            {/* RIGHT: Diploma frame + Medal */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Stack spacing={3}>
                {/* Diploma frame — Education */}
                <MotionBox variants={itemVariants}>
                  <Box sx={{
                    border: '3px double',
                    borderColor: glow.primaryGlow(0.25),
                    p: 0.5,
                    borderRadius: '2px',
                  }}>
                    <Box sx={{
                      border: '1px solid',
                      borderColor: glow.primaryGlow(0.15),
                      p: 3,
                      textAlign: 'center',
                      bgcolor: isDark ? 'rgba(44, 31, 14, 0.3)' : 'rgba(250, 246, 238, 0.5)',
                    }}>
                      <Typography sx={{
                        fontFamily: typography.fonts.label,
                        fontSize: '0.55rem',
                        color: 'text.secondary',
                        letterSpacing: typography.spacing.superLoose,
                        mb: 1,
                      }}>
                        ACADEMIC CREDENTIALS
                      </Typography>

                      <Box sx={{
                        width: 40,
                        height: 1,
                        bgcolor: 'primary.main',
                        mx: 'auto',
                        mb: 2,
                        opacity: 0.4,
                      }} />

                      <Typography sx={{
                        fontFamily: typography.fonts.primary,
                        fontWeight: typography.weights.bold,
                        fontSize: '1.4rem',
                        color: 'text.primary',
                        mb: 0.5,
                      }}>
                        {education.degree}
                      </Typography>

                      <Typography sx={{
                        fontFamily: typography.fonts.secondary,
                        fontSize: '0.9rem',
                        color: 'primary.main',
                        fontStyle: 'italic',
                        mb: 0.5,
                      }}>
                        {education.institution}
                      </Typography>

                      <Typography sx={{
                        fontFamily: typography.fonts.label,
                        fontSize: '0.6rem',
                        color: 'text.secondary',
                        letterSpacing: typography.spacing.loose,
                      }}>
                        {education.period} — {education.location}
                      </Typography>

                      <Box sx={{
                        width: 40,
                        height: 1,
                        bgcolor: 'primary.main',
                        mx: 'auto',
                        mt: 2,
                        opacity: 0.4,
                      }} />

                      {/* School icon */}
                      <School sx={{
                        fontSize: 28,
                        color: 'primary.main',
                        opacity: 0.3,
                        mt: 1.5,
                      }} />
                    </Box>
                  </Box>
                </MotionBox>

                {/* Military medal — Achievement */}
                {achievements.map((ach, i) => (
                  <MotionBox key={i} variants={itemVariants}>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 3,
                      bgcolor: isDark ? 'rgba(44, 31, 14, 0.4)' : 'rgba(250, 246, 238, 0.6)',
                      border: '1px solid',
                      borderColor: glow.primaryGlow(0.15),
                      borderRadius: '2px',
                    }}>
                      <Typography sx={{
                        fontFamily: typography.fonts.label,
                        fontSize: '0.55rem',
                        color: 'text.secondary',
                        letterSpacing: typography.spacing.superLoose,
                        mb: 2,
                      }}>
                        HONORS & MEDALS
                      </Typography>

                      {/* Ribbon bar */}
                      <Box sx={{
                        width: 48,
                        height: 16,
                        background: `linear-gradient(90deg, ${secondaryColor}, ${primaryColor}, ${secondaryColor})`,
                        borderRadius: '2px',
                        mb: 1,
                        opacity: 0.8,
                      }} />

                      {/* Medal circle */}
                      <Box sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        border: '3px solid',
                        borderColor: isDark ? 'rgba(218, 165, 32, 0.5)' : 'rgba(184, 134, 11, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: isDark ? 'rgba(218, 165, 32, 0.08)' : 'rgba(184, 134, 11, 0.06)',
                        mb: 2,
                      }}>
                        <EmojiEvents sx={{
                          fontSize: 24,
                          color: isDark ? 'rgba(218, 165, 32, 0.8)' : 'rgba(184, 134, 11, 0.6)',
                        }} />
                      </Box>

                      <Typography sx={{
                        fontFamily: typography.fonts.primary,
                        fontWeight: typography.weights.semiBold,
                        fontSize: '0.95rem',
                        color: 'text.primary',
                        textAlign: 'center',
                        mb: 0.5,
                      }}>
                        {ach.title}
                      </Typography>

                      <Typography sx={{
                        fontFamily: typography.fonts.secondary,
                        fontSize: '0.8rem',
                        color: 'text.secondary',
                        textAlign: 'center',
                        lineHeight: 1.5,
                        fontStyle: 'italic',
                      }}>
                        {ach.description}
                      </Typography>
                    </Box>
                  </MotionBox>
                ))}
              </Stack>
            </Grid>
          </Grid>

          {/* Printer's colophon footer */}
          <MotionBox
            variants={itemVariants}
            sx={{
              mt: spacing.xxl,
              textAlign: 'center',
              pt: 4,
              borderTop: '1px solid',
              borderColor: glow.primaryGlow(0.08),
            }}
          >
            <Typography sx={{
              fontFamily: typography.fonts.label,
              fontSize: '0.55rem',
              color: 'text.secondary',
              letterSpacing: typography.spacing.extraLoose,
              opacity: 0.6,
            }}>
              ❧ PRINTED & BOUND BY {personalInfo.name.toUpperCase()} ❧
            </Typography>
            <Typography sx={{
              fontFamily: typography.fonts.label,
              fontSize: '0.5rem',
              color: 'text.secondary',
              letterSpacing: typography.spacing.loose,
              mt: 0.5,
              opacity: 0.4,
            }}>
              THIS VOLUME MMXXVI
            </Typography>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}
