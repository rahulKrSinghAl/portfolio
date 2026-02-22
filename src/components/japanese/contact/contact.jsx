import { Box, Container, Typography, Paper, Stack, IconButton, Grid } from '@mui/material';
import { Email, LinkedIn, Phone, LocationOn, EmojiEvents, School, ContactMail } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useTheme } from '@mui/material/styles';
import { personalInfo, education, achievements } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { RevealOnScroll, SectionDivider, DecorativeElements } from '../../shared';
import { getContactStyles } from './contact.styles';

const MotionIconButton = motion.create(IconButton);
const MotionBox = motion.create(Box);

export default function Contact() {
  const theme = useTheme();
  const styles = getContactStyles(theme);
  const prefersReducedMotion = usePrefersReducedMotion();

  const iconButtonVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.1,
        duration: prefersReducedMotion ? 0 : theme.custom.animations.duration.normal,
        ease: theme.custom.animations.easing.easeOut,
      },
    }),
  };

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : theme.custom.animations.duration.slow,
        ease: theme.custom.animations.easing.easeOut,
      },
    },
  };

  return (
    <>
      <SectionDivider variant="geometric" />
      <Box id="contact" sx={styles.container}>
        <Box sx={styles.decorativeOverlay}>
          <DecorativeElements type="floating" color="primary" />
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <RevealOnScroll direction="up">
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={styles.sectionHeader}>
              <ContactMail sx={{ ...styles.sectionIcon, fontSize: 40 }} />
              <Typography variant="h2" sx={styles.sectionHeadingJp}>
                連絡先
              </Typography>
              <Typography variant="h2" sx={styles.sectionHeadingEn}>
                Contact
              </Typography>
            </Stack>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2}>
              <Paper elevation={0} sx={styles.contactCard}>
                <Typography variant="h4" sx={styles.contactTitle}>
                  Get In Touch
                </Typography>

                <Grid container spacing={4}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={2} alignItems="center">
                      <Email sx={{ ...styles.contactInfoIcon, fontSize: 40 }} />
                      <Typography variant="h6" sx={styles.contactInfoLabel}>
                        Email
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={styles.contactInfoValue}>
                        {personalInfo.email}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={2} alignItems="center">
                      <Phone sx={{ ...styles.contactInfoIcon, fontSize: 40 }} />
                      <Typography variant="h6" sx={styles.contactInfoLabel}>
                        Phone
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {personalInfo.phone}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={2} alignItems="center">
                      <LocationOn sx={{ ...styles.contactInfoIcon, fontSize: 40 }} />
                      <Typography variant="h6" sx={styles.contactInfoLabel}>
                        Location
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {personalInfo.location}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>

                <Box
                  component={motion.div}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: theme.custom.spacing.xl }}>
                    {[
                      { icon: <Email />, href: `mailto:${personalInfo.email}` },
                      { icon: <LinkedIn />, href: personalInfo.linkedin, target: '_blank' },
                      { icon: <Phone />, href: `tel:${personalInfo.phone}` },
                    ].map((item, index) => (
                      <Tilt key={index} tiltMaxAngleX={10} tiltMaxAngleY={10}>
                        <MotionIconButton
                          variants={iconButtonVariants}
                          custom={index}
                          href={item.href}
                          target={item.target}
                          whileHover={
                            prefersReducedMotion
                              ? {}
                              : { scale: 1.1, rotate: 5, transition: { duration: theme.custom.animations.duration.fast } }
                          }
                          sx={styles.socialButton}
                        >
                          {item.icon}
                        </MotionIconButton>
                      </Tilt>
                    ))}
                  </Stack>
                </Box>
              </Paper>
            </Tilt>
          </RevealOnScroll>

          {/* Education & Achievements */}
          <Grid container spacing={4} sx={{ mb: theme.custom.spacing.xl }}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
              <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} style={{ width: '100%', height: '100%' }}>
                <MotionBox
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  sx={{ width: '100%', height: '100%' }}
                >
                  <Paper elevation={0} sx={{ ...styles.glassCard, ...styles.educationCard }}>
                    <Stack direction="row" alignItems="center" spacing={1.5} sx={styles.cardSectionHeader}>
                      <School sx={{ ...styles.cardSectionIcon, fontSize: 32 }} />
                      <Typography variant="h5" sx={styles.cardSectionTitle}>
                        教育 / Education
                      </Typography>
                    </Stack>
                    <Stack spacing={1}>
                      <Typography variant="h6" sx={styles.educationDegree}>
                        {education.degree}
                      </Typography>
                      <Typography variant="body1" color="primary">
                        {education.institution}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {education.period} • {education.location}
                      </Typography>
                    </Stack>
                  </Paper>
                </MotionBox>
              </Tilt>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
              <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} style={{ width: '100%', height: '100%' }}>
                <MotionBox
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  sx={{ width: '100%', height: '100%' }}
                >
                  <Paper elevation={0} sx={{ ...styles.glassCard, ...styles.achievementsCard }}>
                    <Stack direction="row" alignItems="center" spacing={1.5} sx={styles.cardSectionHeader}>
                      <EmojiEvents sx={{ ...styles.achievementsIcon, fontSize: 32 }} />
                      <Typography variant="h5" sx={styles.cardSectionTitle}>
                        実績 / Achievements
                      </Typography>
                    </Stack>
                    <Stack spacing={2}>
                      {achievements.map((achievement, index) => (
                        <Box key={index}>
                          <Typography variant="h6" sx={styles.achievementTitle}>
                            {achievement.title}
                          </Typography>
                          <Typography variant="body1" color="text.secondary" sx={styles.achievementDescription}>
                            {achievement.description}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Paper>
                </MotionBox>
              </Tilt>
            </Grid>
          </Grid>

          {/* Footer */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} {personalInfo.name}. Built with React & MUI.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}
