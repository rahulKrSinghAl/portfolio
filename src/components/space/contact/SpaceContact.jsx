import React, { useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  IconButton,
  Grid,
} from '@mui/material';
import {
  Email,
  LinkedIn,
  Phone,
  LocationOn,
  EmojiEvents,
  School,
  ContactMail,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { personalInfo, education, achievements } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

// ---------------------------------------------------------------------------
// Keyframe Animations
// ---------------------------------------------------------------------------

const pulseScan = keyframes`
  0% {
    left: -10%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    left: 110%;
    opacity: 0;
  }
`;

const glowPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 8px rgba(0, 212, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.6), 0 0 40px rgba(0, 212, 255, 0.2);
  }
`;

// -- Decorative element keyframes --

const signalWaveExpand = keyframes`
  0% {
    transform: scale(0.3);
    opacity: 0.7;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
`;

const signalRingPulse = keyframes`
  0% {
    transform: scale(0.4);
    opacity: 0.6;
  }
  100% {
    transform: scale(2.2);
    opacity: 0;
  }
`;

const satelliteFloat = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-6px) rotate(1.5deg);
  }
  50% {
    transform: translateY(-3px) rotate(-1deg);
  }
  75% {
    transform: translateY(-8px) rotate(0.5deg);
  }
`;

const dataPacketPath1 = keyframes`
  0% {
    offset-distance: 0%;
    opacity: 0;
  }
  10% {
    opacity: 0.25;
  }
  90% {
    opacity: 0.25;
  }
  100% {
    offset-distance: 100%;
    opacity: 0;
  }
`;

const dataPacketPath2 = keyframes`
  0% {
    offset-distance: 0%;
    opacity: 0;
  }
  15% {
    opacity: 0.2;
  }
  85% {
    opacity: 0.2;
  }
  100% {
    offset-distance: 100%;
    opacity: 0;
  }
`;

const morseScroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

// Glass style function - moved to component to access theme

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const childFade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// ---------------------------------------------------------------------------
// Subcomponents
// ---------------------------------------------------------------------------

function SignalPort({ icon, label, value }) {
  const theme = useTheme();
  const primaryColor = theme.palette.primary?.main || '#00d4ff';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        flex: 1,
        py: 2,
        px: { xs: 1, sm: 2 },
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          background: (theme) => theme.custom.glow.primaryGlow(0.06),
          border: (theme) => `1px solid ${theme.custom.glow.primaryGlow(0.12)}`,
          boxShadow: (theme) => `0 0 16px ${theme.custom.glow.primaryGlow(0.15)}, inset 0 0 12px ${theme.custom.glow.primaryGlow(0.05)}`,
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          '&:hover': {
            boxShadow: (theme) => `0 0 24px ${theme.custom.glow.primaryGlow(0.35)}, inset 0 0 16px ${theme.custom.glow.primaryGlow(0.1)}`,
            transform: 'scale(1.08)',
          },
        }}
      >
        {React.cloneElement(icon, {
          sx: {
            fontSize: 28,
            color: primaryColor,
            filter: `drop-shadow(0 0 6px ${primaryColor})`,
          },
        })}
      </Box>
      <Typography
        variant="caption"
        sx={{
          fontFamily: 'monospace',
          letterSpacing: '0.18em',
          color: 'text.secondary',
          fontWeight: 700,
          fontSize: '0.65rem',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'text.primary',
          textAlign: 'center',
          fontSize: { xs: '0.78rem', sm: '0.85rem' },
          wordBreak: 'break-word',
          maxWidth: 200,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function SignalLine({ reducedMotion }) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 2,
        my: 5,
        overflow: 'hidden',
      }}
    >
      {/* Base line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '5%',
          width: '90%',
          height: '100%',
          background: (theme) =>
            `linear-gradient(90deg, transparent, ${theme.custom.glow.primaryGlow(0.15)} 20%, ${theme.custom.glow.primaryGlow(0.15)} 80%, transparent)`,
          borderRadius: 1,
        }}
      />
      {/* Scanning pulse */}
      {!reducedMotion && (
        <Box
          sx={{
            position: 'absolute',
            top: -2,
            width: 60,
            height: 6,
            borderRadius: 3,
            background: (theme) =>
              `radial-gradient(ellipse at center, ${theme.custom.glow.primaryGlow(0.9)} 0%, ${theme.custom.glow.primaryGlow(0)} 70%)`,
            boxShadow: (theme) => `0 0 12px 4px ${theme.custom.glow.primaryGlow(0.4)}`,
            animation: `${pulseScan} 3.5s linear infinite`,
          }}
        />
      )}
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function SpaceContact() {
  const theme = useTheme();
  const reducedMotion = usePrefersReducedMotion();
  const primaryColor = theme.palette.primary?.main || '#00d4ff';
  const isDark = theme.palette.mode === 'dark';
  const glass = theme.palette.glass;

  const GLASS_SX = {
    background: glass.background,
    border: `1px solid ${glass.border}`,
    backdropFilter: theme.custom.glassEffect.blur,
    WebkitBackdropFilter: theme.custom.glassEffect.blur,
    borderRadius: '6px',
  };

  const motionProps = useMemo(
    () =>
      reducedMotion
        ? {}
        : {
            initial: 'hidden',
            whileInView: 'visible',
            viewport: { once: true, amount: 0.15 },
          },
    [reducedMotion],
  );

  const channels = [
    {
      icon: <Email />,
      label: 'EMAIL',
      value: personalInfo.email,
    },
    {
      icon: <Phone />,
      label: 'PHONE',
      value: personalInfo.phone,
    },
    {
      icon: <LocationOn />,
      label: 'LOCATION',
      value: personalInfo.location,
    },
  ];

  const socialActions = [
    {
      icon: <Email />,
      label: 'Send Email',
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: <LinkedIn />,
      label: 'LinkedIn',
      href: personalInfo.linkedin,
    },
    {
      icon: <Phone />,
      label: 'Call',
      href: `tel:${personalInfo.phone}`,
    },
  ];

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg">
        {/* ---------------------------------------------------------------- */}
        {/* Section Header                                                   */}
        {/* ---------------------------------------------------------------- */}
        <Box
          component={motion.div}
          variants={sectionVariants}
          {...motionProps}
          sx={{ textAlign: 'center', mb: 6 }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1.5}
            sx={{ mb: 1 }}
          >
            <ContactMail
              sx={{
                fontSize: 32,
                color: primaryColor,
                filter: `drop-shadow(0 0 8px ${primaryColor})`,
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 800,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                background: `linear-gradient(135deg, ${primaryColor}, #a78bfa)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.8rem', md: '2.4rem' },
              }}
            >
              COMMS
            </Typography>
          </Stack>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: 'monospace',
              color: 'text.secondary',
              letterSpacing: '0.12em',
              fontSize: '0.9rem',
              opacity: 0.7,
            }}
          >
            Transmission Hub
          </Typography>
        </Box>

        {/* ---------------------------------------------------------------- */}
        {/* Main Contact Card                                                */}
        {/* ---------------------------------------------------------------- */}
        <Box
          component={motion.div}
          variants={cardVariants}
          {...motionProps}
          sx={{ mb: 4 }}
        >
          <Tilt
            tiltMaxAngleX={3}
            tiltMaxAngleY={3}
            glareEnable={false}
            tiltEnable={!reducedMotion}
            style={{ width: '100%' }}
          >
            <Paper
              elevation={0}
              sx={{
                ...GLASS_SX,
                p: { xs: 3, md: 5 },
                transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
                '&:hover': {
                  boxShadow: (theme) => isDark
                    ? `0 0 30px ${theme.custom.glow.primaryGlow(0.12)}, inset 0 0 30px ${theme.custom.glow.primaryGlow(0.03)}`
                    : `0 4px 30px ${theme.palette.action.hover}`,
                  borderColor: (theme) => isDark ? theme.custom.glow.primaryGlow(0.18) : theme.palette.action.selected,
                },
              }}
            >
              {/* Title */}
              <Typography
                variant="h5"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  textAlign: 'center',
                  mb: 4,
                  color: 'text.primary',
                  textTransform: 'uppercase',
                  fontSize: { xs: '1rem', md: '1.3rem' },
                }}
              >
                INITIATE TRANSMISSION
              </Typography>

              {/* Communication Channels */}
              <Box
                component={motion.div}
                variants={staggerContainer}
                {...motionProps}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  divider={
                    <Box
                      sx={{
                        width: { xs: '60%', sm: '1px' },
                        height: { xs: '1px', sm: 80 },
                        alignSelf: 'center',
                        background: (theme) =>
                          `linear-gradient(to bottom, transparent, ${theme.custom.glow.primaryGlow(0.15)}, transparent)`,
                        mx: { sm: 1 },
                        my: { xs: 1, sm: 0 },
                      }}
                    />
                  }
                  alignItems="center"
                  justifyContent="center"
                >
                  {channels.map((channel) => (
                    <Box
                      key={channel.label}
                      component={motion.div}
                      variants={childFade}
                    >
                      <SignalPort
                        icon={channel.icon}
                        label={channel.label}
                        value={channel.value}
                      />
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* Social Action Buttons */}
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                sx={{ mt: 4 }}
              >
                {socialActions.map((action) => (
                  <IconButton
                    key={action.label}
                    component="a"
                    href={action.href}
                    target={action.label === 'LinkedIn' ? '_blank' : undefined}
                    rel={
                      action.label === 'LinkedIn'
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    aria-label={action.label}
                    sx={{
                      width: 48,
                      height: 48,
                      backgroundColor: 'primary.main',
                      color: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.default : '#ffffff',
                      borderRadius: '12px',
                      transition:
                        'box-shadow 0.3s ease, transform 0.3s ease, background-color 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        boxShadow: (theme) => `0 0 20px ${theme.palette.primary.main}, 0 0 40px ${theme.custom.glow.primaryGlow(0.25)}`,
                        transform: 'translateY(-2px) scale(1.06)',
                      },
                    }}
                  >
                    {action.icon}
                  </IconButton>
                ))}
              </Stack>
            </Paper>
          </Tilt>
        </Box>

        {/* ---------------------------------------------------------------- */}
        {/* Signal Line Decoration                                           */}
        {/* ---------------------------------------------------------------- */}
        <SignalLine reducedMotion={reducedMotion} />

        {/* ---------------------------------------------------------------- */}
        {/* Education & Achievements Grid                                    */}
        {/* ---------------------------------------------------------------- */}
        <Box
          component={motion.div}
          variants={staggerContainer}
          {...motionProps}
        >
          <Grid container spacing={3}>
            {/* Education Card */}
            <Grid item xs={12} md={6}>
              <Box component={motion.div} variants={cardVariants}>
                <Tilt
                  tiltMaxAngleX={4}
                  tiltMaxAngleY={4}
                  glareEnable={false}
                  tiltEnable={!reducedMotion}
                  style={{ height: '100%' }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      ...GLASS_SX,
                      p: { xs: 3, md: 4 },
                      height: '100%',
                      transition:
                        'box-shadow 0.4s ease, border-color 0.4s ease',
                      '&:hover': {
                        boxShadow: (theme) => isDark
                          ? `0 0 24px ${theme.custom.glow.primaryGlow(0.1)}, inset 0 0 20px ${theme.custom.glow.primaryGlow(0.03)}`
                          : `0 4px 20px ${theme.palette.action.hover}`,
                        borderColor: (theme) => isDark ? theme.custom.glow.primaryGlow(0.16) : theme.palette.action.selected,
                      },
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                      <School
                        sx={{
                          fontSize: 26,
                          color: primaryColor,
                          filter: `drop-shadow(0 0 6px ${primaryColor})`,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          fontSize: '0.95rem',
                          color: 'text.primary',
                        }}
                      >
                        Training Protocol
                      </Typography>
                    </Stack>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 0.5,
                        color: 'text.primary',
                        fontSize: '1.1rem',
                      }}
                    >
                      {education.degree}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: primaryColor,
                        fontFamily: 'monospace',
                        mb: 0.5,
                        fontSize: '0.85rem',
                      }}
                    >
                      {education.institution}
                      {education.location ? `, ${education.location}` : ''}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontFamily: 'monospace',
                        letterSpacing: '0.08em',
                        fontSize: '0.75rem',
                      }}
                    >
                      {education.period}
                    </Typography>
                  </Paper>
                </Tilt>
              </Box>
            </Grid>

            {/* Achievements Card */}
            <Grid item xs={12} md={6}>
              <Box component={motion.div} variants={cardVariants}>
                <Tilt
                  tiltMaxAngleX={4}
                  tiltMaxAngleY={4}
                  glareEnable={false}
                  tiltEnable={!reducedMotion}
                  style={{ height: '100%' }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      ...GLASS_SX,
                      p: { xs: 3, md: 4 },
                      height: '100%',
                      transition:
                        'box-shadow 0.4s ease, border-color 0.4s ease',
                      '&:hover': {
                        boxShadow: (theme) => isDark
                          ? `0 0 24px ${theme.custom.glow.primaryGlow(0.1)}, inset 0 0 20px ${theme.custom.glow.primaryGlow(0.03)}`
                          : `0 4px 20px ${theme.palette.action.hover}`,
                        borderColor: (theme) => isDark ? theme.custom.glow.primaryGlow(0.16) : theme.palette.action.selected,
                      },
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                      <EmojiEvents
                        sx={{
                          fontSize: 26,
                          color: primaryColor,
                          filter: `drop-shadow(0 0 6px ${primaryColor})`,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          fontSize: '0.95rem',
                          color: 'text.primary',
                        }}
                      >
                        Commendations
                      </Typography>
                    </Stack>

                    <Stack spacing={2.5}>
                      {achievements.map((item, idx) => (
                        <Box key={idx}>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 700,
                              mb: 0.5,
                              color: 'text.primary',
                              fontSize: '0.95rem',
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              fontSize: '0.82rem',
                              lineHeight: 1.6,
                            }}
                          >
                            {item.description}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Paper>
                </Tilt>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* ---------------------------------------------------------------- */}
        {/* Footer                                                           */}
        {/* ---------------------------------------------------------------- */}
        <Box
          component={motion.div}
          variants={childFade}
          {...motionProps}
          sx={{ textAlign: 'center', mt: 8 }}
        >
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
              fontSize: '0.72rem',
              opacity: 0.5,
            }}
          >
            &copy; {new Date().getFullYear()} {personalInfo.name}. All
            transmissions secured.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
