import { LoginItemTypes } from '~/constants/loginItems';
import { createLoginItem } from '~/logic/utils/loginItems';
import { LoginItem } from '~/typings/loginItems';
import { StrictSessionUser } from '~/typings/user';

export const determineLoginItems = (user: StrictSessionUser): LoginItem[] => {
  const { displayName } = user;

  const loginItems: LoginItem[] = [];

  if (!displayName) {
    loginItems.push(
      createLoginItem(LoginItemTypes.DisplayName, {
        title: 'Set display name',
        description:
          'Set a display name for your account. This will be visible to other users. It does not need to be unique.',
        defaultValues: {
          [LoginItemTypes.DisplayName]: '',
        },
        required: false,
      })
    );
  }

  return loginItems;
};
