import { TextInputProps } from '~/typings/form';

import { Input } from './Input';

export const TextInput: React.FC<Omit<TextInputProps, 'type'>> = ({
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
    type="text"
    validations={validations}
  />
);
