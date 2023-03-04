import { v4 as uuid4 } from 'uuid';

import { LoginItemTypes } from '~/constants/loginItems';
import { LoginItem } from '~/typings/loginItems';

export const createLoginItem = (
  type: LoginItemTypes,
  itemBody: Omit<LoginItem, 'id' | 'createdOn' | 'completed' | 'type'>
): LoginItem => ({
  id: uuid4(),
  createdOn: new Date(),
  completed: false,
  type,
  ...itemBody,
});
