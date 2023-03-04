import { v4 as uuid4 } from 'uuid';

import { LoginItemTypes } from '~/constants/loginItems';
import { LoginItem } from '~/typings/loginItems';

export const createLoginItem = (
  type: LoginItemTypes,
  required?: boolean
): LoginItem => ({
  id: uuid4(),
  createdOn: new Date(),
  completed: false,
  required: Boolean(required),
  type,
});
