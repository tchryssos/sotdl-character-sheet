import styled from '@emotion/styled';
import { startCase, upperFirst } from 'lodash';
import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  ConnectedSelectProps,
  SelectInputProps,
  SelectOption,
} from '~/components/form/typings';
import { EditContext } from '~/logic/contexts/editContext';
import { Spacing } from '~/typings/theme';

import { Box } from '../box/Box';
import { FlexBox } from '../box/FlexBox';
import { Pill } from '../pills/Pill';
import { Text } from '../Text';
import { Label } from './Label';

const placeholderVal = 'placeholder-ignore';

const multipleHeight: Spacing = 48;

const Selector = styled.select<{ showDisabledState: boolean }>(
  ({ theme, multiple, showDisabledState }) => ({
    height: multiple ? theme.spacing[multipleHeight] : theme.spacing[40],
    padding: theme.spacing[4],
    fontSize: theme.fontSize.body,
    width: '100%',
    marginTop: theme.spacing[8],
    ...(multiple && {
      '&:focus, &:hover': {
        height: multiple ? theme.spacing[96] : theme.spacing[multipleHeight],
      },
    }),
    ...(showDisabledState && {
      backgroundColor: 'transparent',
      outlineColor: theme.colors.accentLight,
      borderColor: theme.colors.accentLight,
      boxShadow: 'none',
      borderStyle: 'solid',
    }),
  })
);

function Option({ value, label, disabled }: SelectOption) {
  return (
    <option disabled={disabled} key={value} value={value}>
      {label}
    </option>
  );
}

interface PlaceholderProps {
  placeholder?: string;
}

function Placeholder({ placeholder }: PlaceholderProps) {
  return placeholder ? (
    <option disabled value={placeholderVal}>
      {placeholder}
    </option>
  ) : null;
}

type ValueDisplayProps = Pick<ConnectedSelectProps<never>, 'name'> &
  Pick<SelectInputProps<never>, 'multiple'>;

function ValueDisplay({ name, multiple }: ValueDisplayProps) {
  const { watch } = useFormContext();

  const value: string[] = watch(name || 'FAKE_KEY_NOTHING');

  if (multiple && value) {
    if (!value.length) {
      return (
        <Box marginTop={8}>
          <Text variant="body-sm">None</Text>
        </Box>
      );
    }
    return (
      <FlexBox flexWrap="wrap" gap={8} marginTop={8}>
        {value.map((v) => (
          <Pill key={v} text={upperFirst(v)} />
        ))}
      </FlexBox>
    );
  }

  return null;
}

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
    multiple,
    maxSelected,
    DisplayComponent,
  } = props;

  const isUnconnected = Boolean(onChange);

  const { alwaysEditable, name } = props as ConnectedSelectProps<T>;

  const { register: formContextRegister, setValue, watch } = useFormContext();
  const { isEditMode } = useContext(EditContext);
  const nonEditLocked = !isEditMode && !alwaysEditable && !isUnconnected;

  useEffect(() => {
    if (placeholder) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(name, placeholderVal as any);
    }
  }, [setValue, placeholder, name]);

  const register = isUnconnected ? undefined : formContextRegister;

  const watchedValue: string | string[] | undefined = watch(
    name || 'FAKE_KEY_NOTHING'
  );
  const valueLength = Array.isArray(watchedValue)
    ? watchedValue.length
    : undefined;

  const SelectDisplayComponent = DisplayComponent || ValueDisplay;

  return (
    <Label label={hideLabel ? '' : label || startCase(name)} labelFor={name}>
      {!isEditMode && !alwaysEditable && Boolean(DisplayComponent) ? null : (
        <Selector
          className={className}
          defaultValue={onChange && placeholder ? placeholderVal : undefined}
          disabled={disabled}
          multiple={multiple}
          showDisabledState={Boolean(nonEditLocked || readOnly)}
          onChange={onChange}
          {...register?.(name, validations)}
        >
          <Placeholder placeholder={placeholder} />
          {options.map(
            ({ value, label: optionLabel, disabled: optionDisabled }) => (
              <Option
                disabled={
                  optionDisabled ||
                  nonEditLocked ||
                  readOnly ||
                  Boolean(
                    maxSelected &&
                      valueLength &&
                      valueLength >= maxSelected &&
                      !watchedValue?.includes(value)
                  )
                }
                key={value}
                label={optionLabel}
                value={value}
              />
            )
          )}
        </Selector>
      )}
      <SelectDisplayComponent multiple={multiple} name={name} />
    </Label>
  );
}
