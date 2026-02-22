import { Box, Container, Typography, Card, CardContent, Chip, Stack, Grid } from '@mui/material';
import { People, Folder } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useTheme } from '@mui/material/styles';
import { projects } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { RevealOnScroll, SectionDivider } from '../../shared';
import { getProjectsStyles } from './projects.styles';

const MotionCard = motion.create(Card);
const MotionBox = motion.create(Box);

export default function Projects() {
  const theme = useTheme();
  const styles = getProjectsStyles(theme);
  const prefersReducedMotion = usePrefersReducedMotion();

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
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.7,
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
      <SectionDivider variant="accent" />
      <Box id="projects" sx={styles.container}>
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <RevealOnScroll direction="up">
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={styles.sectionHeader}>
              <Folder sx={{ ...styles.sectionIcon, fontSize: 40 }} />
              <Typography variant="h2" sx={styles.sectionHeadingJp}>
                プロジェクト
              </Typography>
              <Typography variant="h2" sx={styles.sectionHeadingEn}>
                Projects
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
            <Grid container spacing={4}>
              {projects.map((project, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index} sx={{ display: 'flex' }}>
                  <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} style={{ width: '100%', height: '100%' }}>
                    <MotionCard
                      variants={cardVariants}
                      elevation={0}
                      sx={styles.card}
                    >
                      <CardContent sx={styles.cardContent}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          sx={{ mb: theme.custom.spacing.sm }}
                        >
                          <Typography variant="h5" sx={styles.projectTitle}>
                            {project.title}
                          </Typography>
                          <Chip
                            icon={<People />}
                            label={`Team: ${project.teamSize}`}
                            size="small"
                            sx={styles.teamChip}
                          />
                        </Stack>

                        <Stack direction="row" spacing={1} sx={{ mb: theme.custom.spacing.sm, flexWrap: 'wrap', gap: 1 }}>
                          <Chip label={project.role} size="small" sx={styles.roleChip} />
                          <Chip label={project.period} size="small" variant="outlined" sx={styles.periodChip} />
                        </Stack>

                        <Typography variant="body2" color="text.secondary" sx={styles.projectDescription}>
                          {project.description}
                        </Typography>

                        <Stack spacing={1.5}>
                          {project.achievements.map((achievement, idx) => (
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
                                <Typography variant="body2" color="text.secondary" sx={styles.achievementText}>
                                  {achievement}
                                </Typography>
                              </Stack>
                            </MotionBox>
                          ))}
                        </Stack>
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
