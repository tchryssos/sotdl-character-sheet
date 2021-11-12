import { NumberInputProps, Validations } from '~/components/form/typings';

import { Input } from './Input';

export interface NumberInputComponentProps
  extends Omit<NumberInputProps, 'type' | 'validations'> {
  validations?: Validations<Record<string, unknown>>;
}

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
  noOutline,
  step,
  alwaysEditable,
}) => (
  <Input
    alwaysEditable={alwaysEditable}
    className={className}
    disabled={disabled}
    hideLabel={hideLabel}
    label={label}
    max={max}
    min={min}
    name={name}
    noOutline={noOutline}
    readOnly={readOnly}
    step={step}
    type="number"
    validations={{ min, max, ...validations }}
  />
);
