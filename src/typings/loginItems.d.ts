import { LoginItemTypes } from '~/constants/loginItems';
import { StrictSessionUser } from './user';

export type LoginItemValues = Partial<
  Record<LoginItemTypes, string | number | boolean>
>;

export type LoginItem = {
  id: string;
  type: LoginItemTypes;
  completed: boolean;
  createdOn: Date;
  title: string;
  description: string;
  defaultValues: LoginItemValues;
} & (
  | {
      onSubmit: (values: LoginItemValues) => Promise<Response>;
      createOnSubmit?: never;
    }
  | {
      onSubmit?: never;
      createOnSubmit: (
        user: StrictSessionUser
      ) => (values: LoginItemValues) => Promise<Response>;
    }
);
