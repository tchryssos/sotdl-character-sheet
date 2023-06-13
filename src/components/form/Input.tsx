/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import { InputUnstyled } from '@mui/base';
import { startCase } from 'lodash';
import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { Label } from '~/components/form/Label';
import { InputProps, NumberInputProps } from '~/components/form/typings';
import { useIsEditingLocked } from '~/logic/hooks/useIsEditingLocked';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const StyledInput = styled.input<Pick<InputProps<any>, 'noOutline'>>(
  ({ theme, noOutline }) => ({
    width: '100%',
    height: theme.spacing[40],
    fontSize: theme.fontSize.body,
    padding: theme.spacing[4],
    color: theme.colors.text,
    marginTop: theme.spacing[8],
    ...(noOutline && {
      borderColor: 'transparent',
      outlineColor: 'transparent',
      paddingLeft: 0,
    }),
  })
);

export function Input<T extends Record<string, unknown>>(props: InputProps<T>) {
  const {
    label,
    readOnly,
    type,
    className,
    validations,
    disabled,
    name,
    hideLabel,
    noOutline,
    customOnChange,
    alwaysEditable,
  } = props as InputProps<T>;
  const { min, max, step = 1 } = props as NumberInputProps<T>;
  const { register } = useFormContext();
  const registeredInput = register(name, validations);
  const isEditingLocked = useIsEditingLocked(Boolean(alwaysEditable));

  const modInputProps = {
    className,
    disabled: disabled || (type === 'checkbox' && isEditingLocked),
    max,
    min,
    name: registeredInput.name,
    noOutline,
    readOnly: readOnly || noOutline || isEditingLocked,
    ref: registeredInput.ref,
    step,
    type,
    onBlur: registeredInput.onBlur,
    onChange: (e: ChangeEvent) => {
      if (customOnChange) {
        customOnChange(e);
      } else {
        registeredInput.onChange(e);
      }
    },
  };

  return (
    <Label label={hideLabel ? '' : label || startCase(name)} labelFor={name}>
      <InputUnstyled slots={{ input: StyledInput }} {...modInputProps} />
    </Label>
  );
}
