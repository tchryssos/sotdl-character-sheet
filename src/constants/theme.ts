const breakpointValues = {
  xxs: 479,
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1200,
  xl: 1440,
};

type ColorHash = `#${string}`;
type ColorRgba = `rgba(${number},${number},${number},${number})`;
interface ColorModeColors {
  background: ColorHash;
  text: ColorHash;
  success: ColorHash;
  danger: ColorHash;
  accentHeavy: ColorHash;
  accentLight: ColorHash;
  smudge: ColorRgba;
}
export type ColorMode = 'light' | 'dark';

const darkModeColors: ColorModeColors = {
  background: '#1d1f21',
  text: '#c5c8c6',
  success: '#6fbd68',
  danger: '#9a4d4d',
  accentHeavy: '#2a3c3e',
  accentLight: '#505253',
  smudge: 'rgba(255,255,255,0.1)',
};

const lightModeColors: ColorModeColors = {
  background: '#fff',
  text: '#000',
  success: '#00784e',
  danger: '#db0033',
  accentHeavy: '#adadad',
  accentLight: '#e8e8e8',
  smudge: 'rgba(0,0,0,0.05)',
};

const theme = {
  breakpointValues,
  breakpoints: {
    xxs: `@media only screen and (max-width: ${breakpointValues.xxs}px)`,
    xs: `@media only screen and (min-width: ${breakpointValues.xs}px)`,
    sm: `@media only screen and (min-width: ${breakpointValues.sm}px)`,
    md: `@media only screen and (min-width: ${breakpointValues.md}px)`,
    lg: `@media only screen and (min-width: ${breakpointValues.lg}px)`,
    xl: `@media only screen and (min-width: ${breakpointValues.xl}px)`,
  },
  spacing: {
    0: '0rem',
    4: '0.25rem',
    8: '0.5rem',
    12: '0.75rem',
    16: '1rem',
    20: '1.25rem',
    24: '1.5rem',
    32: '2rem',
    40: '2.5rem',
    48: '3rem',
    64: '4rem',
    80: '5rem',
    128: '8rem',
  },
  border: {
    borderWidth: {
      1: '0.0625rem',
      3: '0.1875rem',
    },
  },
  fontSize: {
    subBody: '0.8rem',
    body: '1rem',
    title: '2rem',
  },
  fontFamily: 'sans-serif',
  lineHeight: {
    normal: 1.2,
  },
  fontWeight: {
    regular: 400,
    bold: 700,
    black: 800,
  },
};

export const lightTheme = { ...theme, colors: lightModeColors };
export const darkTheme = { ...theme, colors: darkModeColors };

// All keys should be the same, so we can just type the theme obj as any of the themes
export type ThemeShape = typeof lightTheme;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Theme extends ThemeShape {}

export const themes: Record<ColorMode, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};
