import japaneseTheme from './japanese';
import spaceTheme from './space';
import vintageTheme from './vintage';

export const themeList = [spaceTheme, japaneseTheme, vintageTheme];

export const defaultThemeId = 'space';

export function getAestheticThemeById(id) {
  return themeList.find((t) => t.id === id) || themeList[0];
}
