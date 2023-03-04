import { LoginItemTypes } from '~/constants/loginItems';
import { createLoginItem } from '~/logic/utils/loginItems';
import { LoginItem } from '~/typings/loginItems';
import { StrictSessionUser } from '~/typings/user';

export const determineLoginItems = (user: StrictSessionUser): LoginItem[] => {
  const { displayName } = user;

  const loginItems: LoginItem[] = [];

  if (!displayName) {
    loginItems.push(createLoginItem(LoginItemTypes.SetDisplayName));
  }

  return loginItems;
};
