import { ChangeEvent, ChangeEventHandler } from 'react';
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
  ListFieldTypes,
  MultiFields,
  NestedFieldTypes,
  UnnestedFieldTypes,
} from '~/typings/form';
import {
  KeyOfListField,
  KeysOfUnion,
  ListFieldRecord,
  ValuesOf,
} from '~/typings/util';

export type Validations<T> = {
  required?: boolean;
} & T;

export type KeyName<T extends Record<string, unknown>> =
  | Extract<keyof T, string>
  | `${keyof ListFieldRecord<T>}.${number}.${KeyOfListField<T>}`;

type BaseInputProps<T, U extends Record<string, unknown>> = T & {
  name: KeyName<U>;
  label?: string;
  readOnly?: boolean;
  type: 'checkbox' | 'text' | 'textarea' | 'number' | 'textarea';
  className?: string;
  disabled?: boolean;
  hideLabel?: boolean;
  noOutline?: boolean;
  customOnChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  alwaysEditable?: boolean;
};

export type TextInputProps<U> = BaseInputProps<
  {
    type: 'text';
    validations?: Validations<{
      minLength?: number;
      maxLength?: number;
      pattern?: RegExp;
    }>;
  },
  U
>;

export type NumberInputProps<U> = BaseInputProps<
  {
    type: 'number';
    min?: number;
    max?: number;
    step?: number;
    validations?: Validations<{
      min?: number;
      max?: number;
    }>;
  },
  U
>;

export type CheckboxInputProps<U> = BaseInputProps<
  {
    type: 'checkbox';
    validations?: Validations<{}>;
  },
  U
>;

export type SelectOption<T = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

type BaseSelectMultipleProps =
  | {
      multiple: true;
      maxSelected?: number;
      DisplayComponent?: React.ComponentType<{ name: string }>;
    }
  | {
      multiple?: never;
      maxSelected?: never;
      DisplayComponent?: never;
    };

type BaseSelectProps = {
  options: SelectOption[];
  placeholder?: string;
} & BaseSelectMultipleProps;

export type ConnectedSelectProps<U> = Omit<
  BaseInputProps<
    BaseSelectProps & {
      validations?: Validations<{}>;
      onChange?: never;
    },
    U
  >,
  'type'
>;

export type UnconnectedSelectProps = Omit<
  BaseInputProps<
    BaseSelectProps & {
      onChange: ChangeEventHandler<HTMLSelectElement>;
      validations?: never;
    },
    never
  >,
  'type' | 'name' | 'customOnChange' | 'alwaysEditable'
>;

export type SelectInputProps<U> =
  | ConnectedSelectProps<U>
  | UnconnectedSelectProps;

export type InputProps<U> =
  | TextInputProps<U>
  | NumberInputProps<U>
  | CheckboxInputProps<U>;
