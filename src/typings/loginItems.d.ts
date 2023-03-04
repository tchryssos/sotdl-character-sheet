import { LoginItemTypes } from '~/constants/loginItems';

export interface LoginItem {
  id: string;
  type: LoginItemTypes;
  required: boolean;
  completed: boolean;
}
