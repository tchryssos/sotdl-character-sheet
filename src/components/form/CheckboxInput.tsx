import { CheckboxInputProps } from '~/typings/form';

import { Input } from './Input';

export const CheckboxInput: React.FC<Omit<CheckboxInputProps, 'type'>> = ({
  label,
  name,
  readOnly,
  className,
  disabled,
  register,
  errors,
  validations,
}) => (
  <Input
    className={className}
    disabled={disabled}
    errors={errors}
    label={label}
    name={name}
    readOnly={readOnly}
    register={register}
    type="checkbox"
    validations={validations}
  />
);
