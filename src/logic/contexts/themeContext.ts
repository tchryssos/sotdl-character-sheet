import { createContext } from 'react';

import { ColorMode } from '~/constants/theme';

export interface ThemeObj {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
}

export const defaultThemeContext: ThemeObj = {
  colorMode: 'light',
  setColorMode: (themeMode: ColorMode) => themeMode,
};

export const ThemeContext = createContext<ThemeObj>(defaultThemeContext);
