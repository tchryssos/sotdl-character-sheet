import { useUser } from '@auth0/nextjs-auth0';

import { StrictSessionUser } from '~/typings/user';

export const getNameFromUser = (user?: StrictSessionUser) => {
  const { displayName, authProviderData } = user || {};

  return (
    displayName ||
    authProviderData?.nickname ||
    authProviderData?.name ||
    authProviderData?.email
  );
};

export const useGetUserName = () => {
  const { user } = useUser();

  return getNameFromUser(user as StrictSessionUser);
};
