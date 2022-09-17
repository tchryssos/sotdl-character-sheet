import { useUser } from '@auth0/nextjs-auth0';

import { StrictSessionUser } from '~/typings/user';

export const useUserIsAdmin = () => {
  const sessionUserMeta = useUser();
  const sessionUser = sessionUserMeta.user as StrictSessionUser | undefined;

  if (sessionUserMeta.isLoading) {
    return undefined;
  }
  return sessionUser?.role === 'admin';
};
