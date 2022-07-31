import { getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import { StrictUser } from '~/typings/user';

export const getSessionUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = getSession(req, res);
  if (session) {
    const { user } = session;
    return prisma.user.findUnique({
      where: {
        authId: user.sub,
      },
    }) as StrictUser;
  }
  return undefined;
};
