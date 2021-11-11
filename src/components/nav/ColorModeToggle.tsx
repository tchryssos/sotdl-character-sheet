import { useContext } from 'react';

import { ColorMode } from '~/constants/theme';
import { ThemeContext } from '~/logic/contexts/themeContext';

import { IconButton } from '../buttons/IconButton';
import { Moon } from '../icons/Moon';
import { Sun } from '../icons/Sun';

const colorToggleObj: Record<ColorMode, ColorMode> = {
  light: 'dark',
  dark: 'light',
};

export const ColorModeToggle = () => {
  const { colorMode, setColorMode } = useContext(ThemeContext);

  const onSwitch = () => {
    setColorMode(colorToggleObj[colorMode]);
  };

  return (
    <IconButton onClick={onSwitch}>
      {colorMode === 'light' ? (
        <Sun title="Light mode" titleId="light-mode-icon" />
      ) : (
        <Moon title="Dark mode" titleId="dark-mode-icon" />
      )}
    </IconButton>
  );
};
