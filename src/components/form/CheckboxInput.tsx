import { CheckboxInputProps } from '~/components/form/typings';

import { Input } from './Input';

export const CheckboxInput: React.FC<Omit<CheckboxInputProps, 'type'>> = ({
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
    type="checkbox"
    validations={validations}
  />
);
