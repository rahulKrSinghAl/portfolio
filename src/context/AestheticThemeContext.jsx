import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getAestheticThemeById, defaultThemeId } from '../themes';
import createMuiTheme from '../themes/create-mui-theme';

const THEME_KEY = 'portfolio-aesthetic-theme';
const MODE_KEY = 'portfolio-color-mode';

function readStorage(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

const AestheticThemeContext = createContext(null);

export function AestheticThemeProvider({ children }) {
  const [themeId, setThemeIdState] = useState(() => readStorage(THEME_KEY, defaultThemeId));
  const [mode, setModeState] = useState(() => readStorage(MODE_KEY, 'dark'));

  const setThemeId = useCallback((id) => {
    setThemeIdState(id);
    try { localStorage.setItem(THEME_KEY, id); } catch { /* noop */ }
  }, []);

  const setMode = useCallback((m) => {
    setModeState(m);
    try { localStorage.setItem(MODE_KEY, m); } catch { /* noop */ }
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setMode]);

  const aestheticTheme = useMemo(() => getAestheticThemeById(themeId), [themeId]);
  const muiTheme = useMemo(() => createMuiTheme(aestheticTheme, mode), [aestheticTheme, mode]);

  const ctx = useMemo(
    () => ({
      themeId,
      setThemeId,
      mode,
      setMode,
      toggleMode,
      aestheticTheme,
      muiTheme,
    }),
    [themeId, setThemeId, mode, setMode, toggleMode, aestheticTheme, muiTheme],
  );

  return (
    <AestheticThemeContext.Provider value={ctx}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AestheticThemeContext.Provider>
  );
}

export function useAestheticTheme() {
  const ctx = useContext(AestheticThemeContext);
  if (!ctx) throw new Error('useAestheticTheme must be used within AestheticThemeProvider');
  return ctx;
}
