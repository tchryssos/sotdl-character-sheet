import { useContext } from 'react';

import { Label } from '~/components/form/Label';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';
import { InputProps, NumberInputProps } from '~/typings/form';

export const Input: React.FC<InputProps> = (props) => {
  const { label, readOnly, type, className, validations, disabled, name } =
    props as InputProps;
  const { min, max } = props as NumberInputProps;
  const { register } = useContext(ReactHookFormContext);
  return (
    <Label label={label} labelFor={name}>
      <input
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
