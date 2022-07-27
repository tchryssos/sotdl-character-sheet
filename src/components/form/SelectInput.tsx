import styled from '@emotion/styled';
import startCase from 'lodash.startcase';
import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { SelectInputProps, SelectOption } from '~/components/form/typings';
import { EditContext } from '~/logic/contexts/editContext';

import { Label } from './Label';

const Selecter = styled.select(({ theme }) => ({
  height: theme.spacing[40],
  padding: theme.spacing[4],
  fontSize: theme.fontSize.body,
  width: '100%',
}));

const Option: React.FC<SelectOption> = ({ value, label, disabled }) => (
  <option disabled={disabled} key={value} value={value}>
    {label}
  </option>
);

interface PlaceholderProps {
  placeholder?: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ placeholder }) =>
  placeholder ? (
    <option disabled value="placeholder-ignore">
      {placeholder}
    </option>
  ) : null;

export function SelectInput<T extends Record<string, unknown>>({
  label,
  name,
  readOnly,
  className,
  disabled,
  validations,
  options,
  placeholder,
  hideLabel,
  alwaysEditable,
}: SelectInputProps<T>) {
  const { register, setValue } = useFormContext();
  const { isEditMode } = useContext(EditContext);
  const nonEditLocked = !isEditMode && !alwaysEditable;

  useEffect(() => {
    if (placeholder) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(name, 'placeholder-ignore' as any);
    }
  }, [setValue, placeholder, name]);

  return (
    <Label label={hideLabel ? '' : label || startCase(name)} labelFor={name}>
      <Selecter
        className={className}
        disabled={disabled}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(name, validations)}
      >
        <Placeholder placeholder={placeholder} />
        {options.map(
          ({ value, label: optionLabel, disabled: optionDisabled }) => (
            <Option
              disabled={optionDisabled || nonEditLocked || readOnly}
              key={value}
              label={optionLabel}
              value={value}
            />
          )
        )}
      </Selecter>
    </Label>
  );
}
