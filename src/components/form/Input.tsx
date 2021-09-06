import styled from '@emotion/styled';
import startCase from 'lodash.startcase';
import { useContext } from 'react';

import { Label } from '~/components/form/Label';
import { InputProps, NumberInputProps } from '~/components/form/typings';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

const StyledInput = styled.input(({ theme }) => ({
  width: '100%',
  height: theme.spacing[40],
  fontSize: theme.fontSize.body,
  padding: theme.spacing[4],
}));

export const Input: React.FC<InputProps> = (props) => {
  const {
    label,
    readOnly,
    type,
    className,
    validations,
    disabled,
    name,
    hideLabel,
  } = props as InputProps;
  const { min, max } = props as NumberInputProps;
  const { register } = useContext(ReactHookFormContext);
  return (
    <Label label={hideLabel ? '' : label || startCase(name)} labelFor={name}>
      <StyledInput
        className={className}
        disabled={disabled}
        max={max}
        min={min}
        readOnly={readOnly}
        type={type}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register?.(name, validations)}
      />
    </Label>
  );
};
