import { ChangeEvent } from 'react';
import {
  FieldValues,
  UseFormRegister,
  DeepMap,
  UseFormWatch,
  FieldErrors,
  UseFormSetValue,
} from 'react-hook-form';

// React Hooks Form
// export type RHFRegister = UseFormRegister<FieldValues>;
// export type RHFErrors = DeepMap<FieldValues, FieldErrors>;
// export type RHFWatch = UseFormWatch<FieldValues>;
// export type RHFSetValue = UseFormSetValue;

export type Validations<T> = {
  required?: boolean;
} & T;

type BaseInputProps<T> = T & {
  name: string;
  label?: string;
  readOnly?: boolean;
  type: 'checkbox' | 'text' | 'textarea' | 'number' | 'textarea';
  className?: string;
  disabled?: boolean;
  hideLabel?: boolean;
  noOutline?: boolean;
  customOnChange?: (event: ChangeEvent) => void;
  alwaysEditable?: boolean;
};

export type TextInputProps = BaseInputProps<{
  type: 'text';
  validations?: Validations<{
    minLength?: number;
    maxLength?: number;
  }>;
}>;

export type NumberInputProps = BaseInputProps<{
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
  validations?: Validations<{
    min?: number;
    max?: number;
  }>;
}>;

export type CheckboxInputProps = BaseInputProps<{
  type: 'checkbox';
  validations?: Validations<{}>;
}>;

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectInputProps = Omit<
  BaseInputProps<{
    validations?: Validations<{}>;
    options: SelectOption[];
    placeholder?: string;
  }>,
  'type'
>;

export type InputProps = TextInputProps | NumberInputProps | CheckboxInputProps;
