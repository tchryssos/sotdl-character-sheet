import { NumberInputProps, Validations } from '~/components/form/typings';

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
  hideLabel,
}) => (
  <Input
    className={className}
    disabled={disabled}
    hideLabel={hideLabel}
    label={label}
    max={max}
    min={min}
    name={name}
    readOnly={readOnly}
    type="number"
    validations={{ min, max, ...validations }}
  />
);
