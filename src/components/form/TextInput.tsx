import { TextInputProps } from '~/typings/form';

import { Input } from './Input';

export const TextInput: React.FC<Omit<TextInputProps, 'type'>> = ({
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
    type="text"
    validations={validations}
  />
);
