import styled from '@emotion/styled';

import { NumberInputProps, Validations } from '~/components/form/typings';
import { useIsEditingLocked } from '~/logic/hooks/useIsEditingLocked';

import { Input } from './Input';

export type NumberInputComponentProps<T> = Omit<
  NumberInputProps<T>,
  'type' | 'validations'
> & {
  validations?: Validations<Record<string, unknown>>;
};

const NumberStyledInput = styled(Input)<{ isEditingLocked: boolean }>(
  ({ isEditingLocked }) => ({
    '-moz-appearance': 'number-input',
    ...(isEditingLocked && {
      '-moz-appearance': 'textfield',
      '::-webkit-outer-spin-button, ::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    }),
  })
);

export function NumberInput<T extends Record<string, unknown>>({
  label,
  name,
  min,
  max,
  readOnly,
  className,
  disabled,
  validations,
  hideLabel,
  noOutline,
  step,
  alwaysEditable,
}: NumberInputComponentProps<T>) {
  const isEditingLocked = useIsEditingLocked(Boolean(alwaysEditable));
  return (
    <NumberStyledInput
      alwaysEditable={alwaysEditable}
      className={className}
      disabled={disabled}
      hideLabel={hideLabel}
      isEditingLocked={isEditingLocked}
      label={label}
      max={max}
      min={min}
      name={name}
      noOutline={noOutline}
      readOnly={readOnly}
      step={step}
      type="number"
      validations={{ min, max, ...validations }}
    />
  );
}
