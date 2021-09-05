import { useContext } from 'react';

import { ReactHookFormContext } from '~/logic/contexts/rhfContext';
import { SelectInputProps, SelectOption } from '~/typings/form';

import { Label } from './Label';

const Option: React.FC<SelectOption> = ({ value, label }) => (
  <option key={value} value={value}>
    {label}
  </option>
);

interface PlaceholderProps {
  placeholder?: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ placeholder }) =>
  placeholder ? (
    <option disabled value="PLACEHOLDER">
      {placeholder}
    </option>
  ) : null;

export const SelectInput: React.FC<Omit<SelectInputProps, 'type'>> = ({
  label,
  name,
  readOnly,
  className,
  disabled,
  validations,
  options,
  placeholder,
}) => {
  const { register } = useContext(ReactHookFormContext);
  return (
    <Label label={label} labelFor={name}>
      <select
        className={className}
        disabled={disabled || readOnly}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register?.(name, validations)}
      >
        <Placeholder placeholder={placeholder} />
        {options.map(({ value, label: optionLabel }) => (
          <Option key={value} label={optionLabel} value={value} />
        ))}
      </select>
    </Label>
  );
};
