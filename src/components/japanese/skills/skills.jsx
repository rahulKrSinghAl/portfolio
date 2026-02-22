import { Box, Container, Typography, Chip, Stack, Paper, Grid } from '@mui/material';
import { Code, Language, Construction } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { useTheme } from '@mui/material/styles';
import { FaReact, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiNextdotjs, SiRedux, SiMui, SiJavascript, SiTypescript } from 'react-icons/si';
import { skills, languages } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { RevealOnScroll, SectionDivider, DecorativeElements } from '../../shared';
import { getSkillsStyles } from './skills.styles';

const skillIcons = {
  'React': FaReact,
  'Next.js': SiNextdotjs,
  'Redux': SiRedux,
  'MUI': SiMui,
  'HTML': FaHtml5,
  'CSS': FaCss3Alt,
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
};

const MotionPaper = motion.create(Paper);
const MotionChip = motion.create(Chip);
const MotionBox = motion.create(Box);

export default function Skills() {
  const theme = useTheme();
  const styles = getSkillsStyles(theme);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref: languageBarsRef, inView: languageBarsInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : theme.custom.animations.duration.normal,
        ease: theme.custom.animations.easing.easeOut,
      },
    },
  };

  const gridItemVariants = {
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
      <SectionDivider variant="wave" />
      <Box id="skills" sx={styles.container}>
        <Box sx={styles.decorativeOverlay}>
          <DecorativeElements type="corners" color="secondary" />
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <RevealOnScroll direction="up">
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={styles.sectionHeader}>
              <Construction sx={{ ...styles.sectionIcon, fontSize: 40 }} />
              <Typography variant="h2" sx={styles.sectionHeadingJp}>
                スキル
              </Typography>
              <Typography variant="h2" sx={styles.sectionHeadingEn}>
                Skills
              </Typography>
            </Stack>
          </RevealOnScroll>

          <Box
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <Grid container spacing={3}>
              {/* Frontend Skills */}
              <Grid size={{ xs: 12, md: 7 }} sx={{ display: 'flex' }}>
                <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} style={{ width: '100%', height: '100%' }}>
                  <MotionPaper
                    variants={gridItemVariants}
                    elevation={0}
                    sx={{ ...styles.glassCard, ...styles.frontendCard }}
                  >
                    <Typography variant="h5" sx={styles.cardTitle}>
                      <Code sx={styles.cardTitleIcon} />
                      Frontend Technologies
                    </Typography>
                    <Box
                      component={motion.div}
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                        {skills.frontend.map((skill, index) => {
                          const IconComponent = skillIcons[skill];
                          return (
                            <MotionChip
                              key={index}
                              icon={IconComponent ? <IconComponent size={18} /> : undefined}
                              label={skill}
                              variants={chipVariants}
                              whileHover={
                                prefersReducedMotion
                                  ? {}
                                  : { scale: 1.05, transition: { duration: theme.custom.animations.duration.fast } }
                              }
                              sx={styles.chipPrimary}
                            />
                          );
                        })}
                      </Stack>
                    </Box>
                  </MotionPaper>
                </Tilt>
              </Grid>

              {/* Programming Languages */}
              <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex' }}>
                <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} style={{ width: '100%', height: '100%' }}>
                  <MotionPaper
                    variants={gridItemVariants}
                    elevation={0}
                    sx={{ ...styles.glassCard, ...styles.languagesCard }}
                  >
                    <Typography variant="h5" sx={styles.cardTitle}>
                      Programming Languages
                    </Typography>
                    <Box
                      component={motion.div}
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                        {skills.languages.map((lang, index) => {
                          const IconComponent = skillIcons[lang];
                          return (
                            <MotionChip
                              key={index}
                              icon={IconComponent ? <IconComponent size={18} /> : undefined}
                              label={lang}
                              variants={chipVariants}
                              whileHover={
                                prefersReducedMotion
                                  ? {}
                                  : { scale: 1.05, transition: { duration: theme.custom.animations.duration.fast } }
                              }
                              sx={styles.chipSecondary}
                            />
                          );
                        })}
                      </Stack>
                    </Box>
                  </MotionPaper>
                </Tilt>
              </Grid>

              {/* Spoken Languages */}
              <Grid size={{ xs: 12 }} sx={{ display: 'flex' }}>
                <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} style={{ width: '100%' }}>
                  <MotionPaper
                    variants={gridItemVariants}
                    elevation={0}
                    sx={{ ...styles.glassCard, ...styles.spokenLanguagesCard }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1.5} sx={styles.languageSectionHeader}>
                      <Language sx={{ ...styles.languageIcon, fontSize: 32 }} />
                      <Typography variant="h5" sx={{ fontWeight: theme.custom.typography.weights.semiBold }}>
                        言語能力 / Languages
                      </Typography>
                    </Stack>
                    <Stack spacing={3} ref={languageBarsRef}>
                      {languages.map((lang, index) => (
                        <Box key={index}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ mb: theme.custom.spacing.xs }}
                          >
                            <Typography variant="body1" sx={styles.languageBarName}>
                              {lang.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {lang.level}
                            </Typography>
                          </Stack>
                          <Box sx={styles.languageBarTrack}>
                            <MotionBox
                              initial={{ width: 0 }}
                              animate={
                                languageBarsInView
                                  ? { width: `${lang.proficiency}%` }
                                  : { width: 0 }
                              }
                              transition={{
                                duration: prefersReducedMotion ? 0 : theme.custom.animations.duration.verySlow,
                                delay: prefersReducedMotion ? 0 : index * 0.2,
                                ease: theme.custom.animations.easing.easeOut,
                              }}
                              sx={styles.languageBarFill}
                            />
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </MotionPaper>
                </Tilt>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
