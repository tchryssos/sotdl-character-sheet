import { useUser } from '@auth0/nextjs-auth0';

import { StrictSessionUser } from '~/typings/user';

import { getNameFromUser } from '../user';

export const useGetUserName = () => {
  const { user } = useUser();

  return getNameFromUser(user as StrictSessionUser);
};
