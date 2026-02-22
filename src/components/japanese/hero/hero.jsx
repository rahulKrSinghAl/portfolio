import { Box, Container, Typography, Button, Stack, IconButton } from '@mui/material';
import { Email, LinkedIn, Phone } from '@mui/icons-material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Tilt from 'react-parallax-tilt';
import { useTheme } from '@mui/material/styles';
import { personalInfo } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { DecorativeElements, Logo } from '../../shared';
import { getHeroStyles } from './hero.styles';

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);
const MotionStack = motion.create(Stack);

export default function Hero() {
  const theme = useTheme();
  const styles = getHeroStyles(theme);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
        delayChildren: prefersReducedMotion ? 0 : 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 1, ease: theme.custom.animations.easing.smooth },
    },
  };

  return (
    <Box sx={styles.container}>
      <MotionBox
        style={{ y: prefersReducedMotion ? 0 : y, opacity: prefersReducedMotion ? 1 : opacity }}
        sx={styles.parallaxContainer}
      >
        <DecorativeElements type="floating" color="primary" />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            sx={styles.contentBox}
          >
            {/* Logo */}
            <MotionBox
              variants={itemVariants}
              sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}
            >
              <Logo size={{ xs: 60, sm: 80, md: 100 }} showGlow={false} />
            </MotionBox>

            {/* Japanese Character */}
            <MotionTypography variants={itemVariants} sx={styles.japaneseCharacter}>
              開発者
            </MotionTypography>

            {/* Subtitle */}
            <MotionTypography variant="h5" variants={itemVariants} sx={styles.subtitle}>
              Frontend Developer・React Specialist
            </MotionTypography>

            {/* Name */}
            <MotionBox variants={itemVariants}>
              <Typography variant="h1" sx={styles.nameText}>
                {personalInfo.name}
              </Typography>
            </MotionBox>

            {/* Type Animation */}
            <MotionBox variants={itemVariants}>
              <Box sx={styles.typeAnimationBox}>
                <Typography variant="h4" sx={styles.typeAnimationText}>
                  <TypeAnimation
                    sequence={[
                      'スケーラブルなReactアプリケーション',
                      2000,
                      'フロントエンドチームのリーダー',
                      2000,
                      'モダンUIシステムの設計',
                      2000,
                      'プロダクショングレードのソリューション',
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </Typography>
              </Box>
            </MotionBox>

            {/* CTA Buttons */}
            <MotionStack direction="row" spacing={3} variants={itemVariants} sx={styles.ctaStack}>
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Email />}
                  href={`mailto:${personalInfo.email}`}
                  sx={styles.ctaButton}
                >
                  Get In Touch
                </Button>
              </Tilt>

              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05}>
                <Button
                  variant="outlined"
                  size="large"
                  href={personalInfo.linkedin}
                  target="_blank"
                  sx={styles.outlinedButton}
                >
                  View LinkedIn
                </Button>
              </Tilt>
            </MotionStack>

            {/* Social Icons */}
            <MotionStack direction="row" spacing={2} variants={itemVariants} sx={{ justifyContent: 'center' }}>
              {[
                { icon: <Email />, href: `mailto:${personalInfo.email}` },
                { icon: <LinkedIn />, href: personalInfo.linkedin, target: '_blank' },
                { icon: <Phone />, href: `tel:${personalInfo.phone}` },
              ].map((item, index) => (
                <Tilt key={index} tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.1}>
                  <IconButton
                    href={item.href}
                    target={item.target}
                    sx={styles.socialIcon}
                  >
                    {item.icon}
                  </IconButton>
                </Tilt>
              ))}
            </MotionStack>
          </MotionBox>
        </Container>
      </MotionBox>
    </Box>
  );
}
