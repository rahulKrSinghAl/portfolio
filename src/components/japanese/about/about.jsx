import { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { Person, Psychology } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { useTheme } from '@mui/material/styles';
import { personalInfo, strengths } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { DecorativeElements, RevealOnScroll, SectionDivider } from '../../shared';
import { getAboutStyles } from './about.styles';

const MotionCard = motion.create(Card);

export default function About() {
  const theme = useTheme();
  const styles = getAboutStyles(theme);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const yearsOfExperience = 4;

  useEffect(() => {
    if (inView && !prefersReducedMotion) {
      let start = 0;
      const duration = 2000;
      const increment = yearsOfExperience / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= yearsOfExperience) {
          setCount(yearsOfExperience);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    } else if (inView) {
      setCount(yearsOfExperience);
    }
  }, [inView, prefersReducedMotion]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
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

  return (
    <>
      <SectionDivider variant="accent" />
      <Box id="about" sx={styles.container}>
        <DecorativeElements type="accent" color="secondary" />

        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <RevealOnScroll direction="up">
            <Box sx={styles.sectionHeader}>
              <Typography variant="h6" sx={styles.sectionLabel}>
                <Person sx={styles.sectionIcon} />
                About
              </Typography>
              <Typography variant="h2" sx={styles.mainHeading}>
                私について
                <Typography component="span" sx={styles.headingEnglish}>
                  Profile
                </Typography>
              </Typography>
            </Box>
          </RevealOnScroll>

          <Grid container spacing={4} sx={{ mb: theme.custom.spacing.xxl }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <RevealOnScroll direction="left">
                <Typography variant="body1" sx={styles.summaryText}>
                  {personalInfo.summary}
                </Typography>
              </RevealOnScroll>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box ref={ref} sx={styles.experienceWrapper}>
                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
                  <Box sx={styles.experienceBox}>
                    <Typography variant="h1" sx={styles.experienceNumber}>
                      {count}+
                    </Typography>
                    <Typography variant="h6" sx={styles.experienceLabel}>
                      年の経験
                    </Typography>
                    <Typography variant="body2" sx={styles.experienceSublabel}>
                      Years of Experience
                    </Typography>
                  </Box>
                </Tilt>
              </Box>
            </Grid>
          </Grid>

          <Box
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <Grid container spacing={3}>
              {strengths.map((strength, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index} sx={{ display: 'flex' }}>
                  <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} style={{ width: '100%', height: '100%' }}>
                    <MotionCard variants={cardVariants} sx={styles.strengthCard}>
                      <CardContent sx={styles.strengthCardContent}>
                        <Box sx={styles.strengthIconRow}>
                          <Psychology sx={{ ...styles.strengthIcon, fontSize: 32 }} />
                          <Typography variant="h5" sx={styles.strengthTitle}>
                            {strength.title}
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={styles.strengthDescription}>
                          {strength.description}
                        </Typography>
                      </CardContent>
                    </MotionCard>
                  </Tilt>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
