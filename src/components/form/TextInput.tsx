import { TextInputProps } from '~/components/form/typings';

import { Input } from './Input';

export const TextInput: React.FC<Omit<TextInputProps, 'type'>> = ({
  label,
  name,
  readOnly,
  className,
  disabled,
  validations,
  hideLabel,
}) => (
  <Input
    className={className}
    disabled={disabled}
    hideLabel={hideLabel}
    label={label}
    name={name}
    readOnly={readOnly}
    type="text"
    validations={validations}
  />
);
