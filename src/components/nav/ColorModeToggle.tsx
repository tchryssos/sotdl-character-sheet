import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { ColorMode } from '~/constants/theme';
import { ThemeContext } from '~/logic/contexts/themeContext';

import { SelectInput } from '../form/SelectInput';
import { SelectInputProps } from '../form/typings';

const options: SelectInputProps['options'] = [
  {
    label: 'Dark',
    value: 'dark',
  },
  {
    label: 'Light',
    value: 'light',
  },
];

export const ColorModeToggle = () => {
  const { watch, setValue } = useFormContext();
  const { setColorMode } = useContext(ThemeContext);

  const colorMode = watch('colorMode');

  useEffect(() => {
    const savedColorMode = localStorage.getItem(
      'colorMode'
    ) as ColorMode | null;
    if (savedColorMode) {
      setColorMode(savedColorMode);
      setValue('colorMode', savedColorMode);
    }
  }, [setColorMode, setValue]);

  useEffect(() => {
    setColorMode(colorMode);
    localStorage.setItem('colorMode', colorMode);
  }, [colorMode]);

  return (
    <SelectInput
      alwaysEditable
      label="Color mode"
      name="colorMode"
      options={options}
    />
  );
};
