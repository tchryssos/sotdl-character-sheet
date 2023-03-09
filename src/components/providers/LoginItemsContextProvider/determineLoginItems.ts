import { LoginItemTypes } from '~/constants/loginItems';
import { createUserApiRoute } from '~/constants/routing/api';
import { createLoginItem } from '~/logic/utils/loginItems';
import { PatchUserData } from '~/pages/api/users/[id]/index';
import { LoginItem } from '~/typings/loginItems';
import { StrictSessionUser } from '~/typings/user';

export const determineLoginItems = (user: StrictSessionUser): LoginItem[] => {
  const { displayName, imageUrl } = user;

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
        createOnSubmit: (submitUser) => async (values) =>
          fetch(createUserApiRoute(submitUser.id), {
            method: 'PATCH',
            body: JSON.stringify({
              ...submitUser,
              // TS doesn't like the irrelevant mismatch between these types
              // so we override
              isPaid: String(submitUser.isPaid),
              displayName: values[LoginItemTypes.DisplayName],
            } as PatchUserData),
          }),
      })
    );
  }

  if (!imageUrl) {
    loginItems.push(
      createLoginItem(LoginItemTypes.ImageUrl, {
        title: 'Select a profile icon',
        description:
          'Select an icon for your profile across rpgsheet. You can use the "shuffle" button to see a new set of icons.',
        defaultValues: {
          [LoginItemTypes.ImageUrl]: '',
        },
        createOnSubmit: (submitUser) => async (values) =>
          fetch(createUserApiRoute(submitUser.id), {
            method: 'PATCH',
            body: JSON.stringify({
              ...submitUser,
              // TS doesn't like the irrelevant mismatch between these types
              // so we override
              isPaid: String(submitUser.isPaid),
              imageUrl: values[LoginItemTypes.ImageUrl],
            } as PatchUserData),
          }),
      })
    );
  }

  return loginItems;
};
