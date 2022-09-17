import { Session } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '~/logic/utils/prisma';

export const loginCallback = async (
  _req: NextApiRequest,
  _res: NextApiResponse,
  session: Session
) => {
  // Very similar to getSessionUser
  // but made to be used with the specific auth0 logic
  // around logging in
  const { user } = session;
  let dbUser = await prisma.user.findUnique({
    where: {
      authId: user.sub,
    },
  });

  const now = new Date();

  if (!dbUser) {
    const data = {
      createdOn: now,
      lastModifiedOn: now,
      authId: user.sub,
      role: 'player',
      email: user.email,
    };
    await prisma.user.create({ data });
    dbUser = await prisma.user.findUnique({
      where: {
        authId: user.sub,
      },
    });
  }

  // eslint-disable-next-line no-param-reassign
  session.user = { ...dbUser, authProviderData: { ...session.user } };
  return session;
};
