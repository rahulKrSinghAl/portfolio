import { Box, Container, Typography, Card, CardContent, Chip, Stack } from '@mui/material';
import { BusinessCenter } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { useTheme } from '@mui/material/styles';
import { experience } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { RevealOnScroll, SectionDivider } from '../../shared';
import { getExperienceStyles } from './experience.styles';

const MotionCard = motion.create(Card);
const MotionBox = motion.create(Box);

export default function Experience() {
  const theme = useTheme();
  const styles = getExperienceStyles(theme);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref: timelineRef, inView: timelineInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
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

  const bulletVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.1,
        duration: prefersReducedMotion ? 0 : theme.custom.animations.duration.normal,
      },
    }),
  };

  return (
    <>
      <SectionDivider variant="geometric" />
      <Box id="experience" sx={styles.container}>
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <RevealOnScroll direction="up">
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={styles.sectionHeader}>
              <BusinessCenter sx={{ ...styles.sectionIcon, fontSize: 40 }} />
              <Typography variant="h2" sx={styles.sectionHeadingJp}>
                経験
              </Typography>
              <Typography variant="h2" sx={styles.sectionHeadingEn}>
                Experience
              </Typography>
            </Stack>
          </RevealOnScroll>

          <Box sx={{ position: 'relative' }} ref={timelineRef}>
            <MotionBox
              initial={{ height: 0 }}
              animate={
                timelineInView
                  ? { height: '100%' }
                  : { height: 0 }
              }
              transition={{ duration: prefersReducedMotion ? 0 : 1.5, ease: theme.custom.animations.easing.easeOut }}
              sx={styles.timelineLine}
            />

            <Box
              component={motion.div}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <Stack spacing={4}>
                {experience.map((job, index) => (
                  <Tilt key={index} tiltMaxAngleX={3} tiltMaxAngleY={3}>
                    <MotionCard
                      variants={cardVariants}
                      elevation={0}
                      sx={styles.card}
                    >
                      <CardContent sx={styles.cardContent}>
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          justifyContent="space-between"
                          alignItems={{ xs: 'flex-start', sm: 'center' }}
                          spacing={2}
                          sx={styles.cardHeader}
                        >
                          <Box>
                            <Typography variant="h5" sx={styles.jobTitle}>
                              {job.title}
                            </Typography>
                            <Typography variant="h6" color="primary" sx={styles.companyName}>
                              {job.company}
                            </Typography>
                          </Box>
                          <Chip label={job.period} sx={styles.periodChip} />
                        </Stack>

                        <Typography variant="body2" color="text.secondary" sx={styles.jobType}>
                          {job.type}
                        </Typography>

                        <Stack spacing={1.5}>
                          {job.achievements.map((achievement, idx) => (
                            <MotionBox
                              key={idx}
                              variants={bulletVariants}
                              custom={idx}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                            >
                              <Stack direction="row" spacing={2}>
                                <Box sx={styles.bulletDot} />
                                <Typography variant="body1" color="text.secondary">
                                  {achievement}
                                </Typography>
                              </Stack>
                            </MotionBox>
                          ))}
                        </Stack>
                      </CardContent>
                    </MotionCard>
                  </Tilt>
                ))}
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
