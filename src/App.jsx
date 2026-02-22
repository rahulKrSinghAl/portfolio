import { useEffect } from 'react';
import { Box } from '@mui/material';
import Lenis from 'lenis';
import { AestheticThemeProvider, useAestheticTheme } from './context/AestheticThemeContext';
import { ThemedBackground } from './components/theme-decorative-bridge';
import ThemeGallery from './components/theme-gallery';

// Japanese theme components
import {
  Header,
  Hero,
  About,
  Experience,
  Skills,
  Projects,
  Contact,
  SectionIndicator,
} from './components/japanese';

// Space theme components
import {
  SpaceHeader,
  SpaceHero,
  SpaceAbout,
  SpaceExperience,
  SpaceSkills,
  SpaceProjects,
  SpaceContact,
  SpaceSectionIndicator,
} from './components/space';

function JapaneseLayout({ darkMode, toggleMode }) {
  return (
    <>
      <SectionIndicator />
      <Box sx={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
        <Header darkMode={darkMode} toggleTheme={toggleMode} />
        <Box id="hero">
          <Hero />
        </Box>
        <About />
        <Experience />
        <Skills />
        <Projects />
        <ThemeGallery />
        <Contact />
      </Box>
    </>
  );
}

function SpaceLayout({ darkMode, toggleMode }) {
  return (
    <>
      <SpaceSectionIndicator />
      <Box sx={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
        <SpaceHeader darkMode={darkMode} toggleTheme={toggleMode} />
        <Box id="hero">
          <SpaceHero />
        </Box>
        <SpaceAbout />
        <SpaceExperience />
        <SpaceSkills />
        <SpaceProjects />
        <ThemeGallery />
        <SpaceContact />
      </Box>
    </>
  );
}

function AppContent() {
  const { mode, toggleMode, themeId } = useAestheticTheme();
  const darkMode = mode === 'dark';

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Fixed Background for Entire Page */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          overflow: 'hidden',
        }}
      >
        <ThemedBackground />
      </Box>

      {/* Render layout based on active theme */}
      {themeId === 'space' ? (
        <SpaceLayout darkMode={darkMode} toggleMode={toggleMode} />
      ) : (
        <JapaneseLayout darkMode={darkMode} toggleMode={toggleMode} />
      )}
    </>
  );
}

function App() {
  return (
    <AestheticThemeProvider>
      <AppContent />
    </AestheticThemeProvider>
  );
}

export default App;
