import { ChangeEvent } from 'react';
import {
  FieldValues,
  UseFormRegister,
  DeepMap,
  UseFormWatch,
  FieldErrors,
  UseFormSetValue,
} from 'react-hook-form';
import { SotdlFields } from '~/constants/form';
import {
  MultiFields,
  NestedFieldTypes,
  UnnestedFieldTypes,
} from '~/typings/form';
import { KeysOfUnion, ValuesOf } from '~/typings/util';

export type Validations<T> = {
  required?: boolean;
} & T;

type test = ValuesOf<NestedFieldTypes<SotdlFields>>;

type BaseInputProps<T> = T & {
  name:
    | ValuesOf<UnnestedFieldTypes<SotdlFields>>
    | `${ValuesOf<MultiFields<SotdlFields>>['fieldName']}.${number}.${string}`
    // | NestedFieldTypes<SotdlFields>[keyof NestedFieldTypes<SotdlFields>]
    | string;

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
