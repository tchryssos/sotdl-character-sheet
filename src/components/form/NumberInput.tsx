import { NumberInputProps, Validations } from '~/typings/form';

import { Input } from './Input';

type NumberInputComponentProps = Omit<
  NumberInputProps,
  'type' | 'validations'
> & {
  validations?: Validations<Record<string, unknown>>;
};

export const NumberInput: React.FC<NumberInputComponentProps> = ({
  label,
  name,
  min,
  max,
  readOnly,
  className,
  disabled,
  validations,
}) => (
  <Input
    className={className}
    disabled={disabled}
    label={label}
    max={max}
    min={min}
    name={name}
    readOnly={readOnly}
    type="number"
    validations={{ min, max, ...validations }}
  />
);
