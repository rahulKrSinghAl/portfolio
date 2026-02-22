import japaneseTheme from './japanese';
import spaceTheme from './space';

export const themeList = [spaceTheme, japaneseTheme];

export const defaultThemeId = 'space';

export function getAestheticThemeById(id) {
  return themeList.find((t) => t.id === id) || themeList[0];
}
