import styled from '@emotion/styled';
import startCase from 'lodash.startcase';
import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  ConnectedSelectProps,
  SelectInputProps,
  SelectOption,
} from '~/components/form/typings';
import { EditContext } from '~/logic/contexts/editContext';

import { Label } from './Label';

const placeholderVal = 'placeholder-ignore';

const Selector = styled.select(({ theme }) => ({
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
    <option disabled value={placeholderVal}>
      {placeholder}
    </option>
  ) : null;

export function SelectInput<T extends Record<string, unknown>>(
  props: SelectInputProps<T>
) {
  const {
    label,
    readOnly,
    className,
    disabled,
    options,
    placeholder,
    hideLabel,
    onChange,
    validations,
  } = props;

  const isUnconnected = Boolean(onChange);

  const { alwaysEditable, name } = props as ConnectedSelectProps<T>;

  const { register: formContextRegister, setValue } = useFormContext();
  const { isEditMode } = useContext(EditContext);
  const nonEditLocked = !isEditMode && !alwaysEditable && !isUnconnected;

  useEffect(() => {
    if (placeholder) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(name, placeholderVal as any);
    }
  }, [setValue, placeholder, name]);

  const register = isUnconnected ? undefined : formContextRegister;

  return (
    <Label label={hideLabel ? '' : label || startCase(name)} labelFor={name}>
      <Selector
        className={className}
        defaultValue={onChange && placeholder ? placeholderVal : undefined}
        disabled={disabled}
        onChange={onChange}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register?.(name, validations)}
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
      </Selector>
    </Label>
  );
}
