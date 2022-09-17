import { getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import { StrictSessionUser } from '~/typings/user';

export const getSessionUser = (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);
  if (session) {
    return session.user as StrictSessionUser;
  }
  return undefined;
};
