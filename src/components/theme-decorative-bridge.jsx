import { useAestheticTheme } from '../context/AestheticThemeContext';

export function ThemedBackground(props) {
  const { aestheticTheme } = useAestheticTheme();
  const { Background } = aestheticTheme.decorativeComponents;
  return <Background {...props} />;
}

export function ThemedDecorativeElements(props) {
  const { aestheticTheme } = useAestheticTheme();
  const { DecorativeElements } = aestheticTheme.decorativeComponents;
  return <DecorativeElements {...props} />;
}

export function ThemedSectionDivider(props) {
  const { aestheticTheme } = useAestheticTheme();
  const { SectionDivider } = aestheticTheme.decorativeComponents;
  return <SectionDivider {...props} />;
}
