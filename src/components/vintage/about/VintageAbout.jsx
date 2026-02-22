import { useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { personalInfo, strengths } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { ThemedDecorativeElements, ThemedSectionDivider } from '../../theme-decorative-bridge';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

// Random visa stamp positions for background
const visaStamps = [
  { top: '10%', left: '5%', rotation: -12, text: 'APPROVED', opacity: 0.04 },
  { top: '30%', right: '8%', rotation: 8, text: 'ENTRY', opacity: 0.03 },
  { bottom: '20%', left: '15%', rotation: -5, text: 'VERIFIED', opacity: 0.035 },
  { top: '60%', right: '20%', rotation: 15, text: 'TRANSIT', opacity: 0.03 },
];

export default function VintageAbout() {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { glow, typography, animations, spacing } = theme.custom;
  const isDark = theme.palette.mode === 'dark';
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const yearsOfExperience = new Date().getFullYear() - 2020;

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
      id="about"
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
              CHAPTER I
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
              Explorer&apos;s Passport
            </Typography>
            <Typography sx={{
              fontFamily: typography.fonts.secondary,
              color: 'text.secondary',
              letterSpacing: typography.spacing.loose,
              mt: 0.5,
              fontStyle: 'italic',
            }}>
              Field Dossier
            </Typography>
          </MotionBox>

          <Grid container spacing={4}>
            {/* LEFT COLUMN — Passport card */}
            <Grid size={{ xs: 12, md: 5 }}>
              <MotionBox variants={itemVariants}>
                {/* Passport Card - rotated 2° */}
                <Box sx={{
                  transform: { xs: 'none', md: 'rotate(2deg)' },
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'rotate(0deg)' },
                }}>
                  <Card sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    bgcolor: isDark ? 'rgba(44, 31, 14, 0.6)' : 'rgba(245, 230, 200, 0.8)',
                    border: '2px solid',
                    borderColor: glow.primaryGlow(0.2),
                    borderRadius: '2px',
                    backdropFilter: 'blur(8px)',
                    boxShadow: isDark
                      ? '0 8px 32px rgba(0,0,0,0.4)'
                      : '0 8px 32px rgba(92,68,9,0.15)',
                  }}>
                    {/* Faded visa stamps background */}
                    {visaStamps.map((stamp, i) => (
                      <Typography key={i} sx={{
                        position: 'absolute',
                        top: stamp.top,
                        left: stamp.left,
                        right: stamp.right,
                        bottom: stamp.bottom,
                        transform: `rotate(${stamp.rotation}deg)`,
                        fontFamily: typography.fonts.label,
                        fontSize: '2rem',
                        color: secondaryColor,
                        opacity: stamp.opacity,
                        fontWeight: typography.weights.bold,
                        letterSpacing: '0.2em',
                        pointerEvents: 'none',
                        userSelect: 'none',
                      }}>
                        {stamp.text}
                      </Typography>
                    ))}

                    <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                      {/* Passport header */}
                      <Box sx={{
                        textAlign: 'center',
                        pb: 2,
                        mb: 2,
                        borderBottom: '1px solid',
                        borderColor: glow.primaryGlow(0.1),
                      }}>
                        <Typography sx={{
                          fontFamily: typography.fonts.label,
                          fontSize: '0.6rem',
                          color: 'primary.main',
                          letterSpacing: typography.spacing.superLoose,
                        }}>
                          REPUBLIC OF CODE
                        </Typography>
                        <Typography sx={{
                          fontFamily: typography.fonts.primary,
                          fontSize: '1.3rem',
                          fontWeight: typography.weights.bold,
                          color: 'text.primary',
                          mt: 0.5,
                        }}>
                          PASSPORT
                        </Typography>
                      </Box>

                      {/* Identity fields */}
                      {[
                        { label: 'FULL NAME', value: personalInfo.name },
                        { label: 'DESIGNATION', value: personalInfo.title },
                        { label: 'BASE CAMP', value: personalInfo.location },
                        { label: 'CORRESPONDENCE', value: personalInfo.email },
                      ].map((field, i) => (
                        <Box key={i} sx={{ mb: 1.5 }}>
                          <Typography sx={{
                            fontFamily: typography.fonts.label,
                            fontSize: '0.55rem',
                            color: 'text.secondary',
                            letterSpacing: typography.spacing.extraLoose,
                          }}>
                            {field.label}
                          </Typography>
                          <Typography sx={{
                            fontFamily: typography.fonts.secondary,
                            fontSize: '0.9rem',
                            color: 'text.primary',
                            borderBottom: '1px dotted',
                            borderColor: glow.primaryGlow(0.15),
                            pb: 0.3,
                          }}>
                            {field.value}
                          </Typography>
                        </Box>
                      ))}
                    </CardContent>
                  </Card>
                </Box>

                {/* Wax seal experience counter */}
                <MotionBox
                  variants={itemVariants}
                  sx={{
                    mt: 3,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Box sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    bgcolor: 'secondary.main',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 6px 20px ${glow.secondaryGlow(0.4)}, inset 0 -3px 6px rgba(0,0,0,0.3)`,
                    clipPath: 'polygon(50% 0%, 63% 5%, 75% 2%, 80% 14%, 93% 14%, 93% 27%, 100% 38%, 95% 48%, 100% 60%, 93% 70%, 93% 82%, 82% 86%, 75% 97%, 63% 93%, 50% 100%, 37% 93%, 25% 97%, 18% 86%, 7% 82%, 7% 70%, 0% 60%, 5% 48%, 0% 38%, 7% 27%, 7% 14%, 20% 14%, 25% 2%, 37% 5%)',
                  }}>
                    <Typography sx={{
                      fontFamily: typography.fonts.primary,
                      fontWeight: typography.weights.extraBold,
                      fontSize: '1.8rem',
                      color: '#FAF6EE',
                      lineHeight: 1,
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    }}>
                      {yearsOfExperience}+
                    </Typography>
                    <Typography sx={{
                      fontFamily: typography.fonts.label,
                      fontSize: '0.45rem',
                      color: '#FAF6EE',
                      letterSpacing: typography.spacing.extraLoose,
                      opacity: 0.8,
                    }}>
                      YEARS
                    </Typography>
                  </Box>
                </MotionBox>
              </MotionBox>
            </Grid>

            {/* RIGHT COLUMN — Journal entry + Specimen labels */}
            <Grid size={{ xs: 12, md: 7 }}>
              <MotionBox variants={itemVariants}>
                {/* Torn journal page bio */}
                <Box sx={{
                  position: 'relative',
                  p: { xs: 2.5, md: 3.5 },
                  bgcolor: isDark ? 'rgba(44, 31, 14, 0.4)' : 'rgba(250, 246, 238, 0.6)',
                  border: '1px solid',
                  borderColor: glow.primaryGlow(0.1),
                  borderRadius: '2px',
                  mb: 4,
                  // Torn edge effect (right side)
                  clipPath: { xs: 'none', md: 'polygon(0 0, 100% 0, 99% 8%, 100% 15%, 98.5% 22%, 100% 30%, 99% 38%, 100% 45%, 98% 52%, 100% 60%, 99.5% 68%, 100% 75%, 98% 82%, 100% 90%, 99% 95%, 100% 100%, 0 100%)' },
                }}>
                  {/* Margin line */}
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 40,
                    bottom: 0,
                    width: '1px',
                    bgcolor: secondaryColor,
                    opacity: 0.1,
                  }} />

                  <Typography sx={{
                    fontFamily: typography.fonts.label,
                    fontSize: '0.6rem',
                    color: 'primary.main',
                    letterSpacing: typography.spacing.extraLoose,
                    mb: 1,
                  }}>
                    FIELD NOTES — PERSONAL ACCOUNT
                  </Typography>
                  <Typography sx={{
                    fontFamily: typography.fonts.secondary,
                    fontSize: '0.95rem',
                    color: 'text.primary',
                    lineHeight: 1.8,
                    textAlign: 'justify',
                    fontStyle: 'italic',
                  }}>
                    &ldquo;{personalInfo.summary}&rdquo;
                  </Typography>
                </Box>

                {/* Specimen label strength cards */}
                <Grid container spacing={2}>
                  {strengths.map((strength, i) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={i}>
                      <MotionCard
                        variants={itemVariants}
                        whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.02 }}
                        sx={{
                          height: '100%',
                          bgcolor: isDark ? 'rgba(44, 31, 14, 0.5)' : 'rgba(245, 230, 200, 0.7)',
                          border: '1px solid',
                          borderColor: glow.primaryGlow(0.15),
                          borderRadius: '2px',
                          position: 'relative',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: glow.primaryGlow(0.3),
                            boxShadow: `0 8px 24px ${glow.primaryGlow(0.1)}`,
                          },
                        }}
                      >
                        {/* Push pin */}
                        <Box sx={{
                          position: 'absolute',
                          top: -6,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: secondaryColor,
                          boxShadow: `0 2px 4px rgba(0,0,0,0.3)`,
                          zIndex: 1,
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            bgcolor: 'rgba(255,255,255,0.4)',
                          },
                        }} />

                        <CardContent sx={{ pt: 2.5 }}>
                          {/* Catalog number */}
                          <Typography sx={{
                            fontFamily: typography.fonts.label,
                            fontSize: '0.5rem',
                            color: 'text.secondary',
                            letterSpacing: typography.spacing.superLoose,
                            mb: 0.5,
                          }}>
                            SPECIMEN #{String(i + 1).padStart(3, '0')}
                          </Typography>

                          <Typography sx={{
                            fontFamily: typography.fonts.primary,
                            fontWeight: typography.weights.semiBold,
                            fontSize: '0.95rem',
                            color: 'primary.main',
                            mb: 1,
                          }}>
                            {strength.title}
                          </Typography>

                          <Typography sx={{
                            fontFamily: typography.fonts.secondary,
                            fontSize: '0.82rem',
                            color: 'text.secondary',
                            lineHeight: 1.6,
                          }}>
                            {strength.description}
                          </Typography>
                        </CardContent>
                      </MotionCard>
                    </Grid>
                  ))}
                </Grid>
              </MotionBox>
            </Grid>
          </Grid>
        </MotionBox>
      </Container>

      <ThemedSectionDivider variant="flourish" />
    </Box>
  );
}
