import { CheckboxInputProps } from '~/typings/form';

import { Input } from './Input';

export const CheckboxInput: React.FC<Omit<CheckboxInputProps, 'type'>> = ({
  label,
  name,
  readOnly,
  className,
  disabled,
  validations,
}) => (
  <Input
    className={className}
    disabled={disabled}
    label={label}
    name={name}
    readOnly={readOnly}
    type="checkbox"
    validations={validations}
  />
);
