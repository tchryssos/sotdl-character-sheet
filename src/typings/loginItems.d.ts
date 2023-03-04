import { LoginItemTypes } from '~/constants/loginItems';

export interface LoginItem {
  id: string;
  type: LoginItemTypes;
  required: boolean;
  completed: boolean;
  createdOn: Date;
  title: string;
  description: string;
  defaultValues: {
    [key: string]: string | boolean | number;
  };
}
