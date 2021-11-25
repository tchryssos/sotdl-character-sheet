import { Session } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export const loginCallback = async (
  _req: NextApiRequest,
  _res: NextApiResponse,
  session: Session
) => {
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
      name: user.nickname || user.name,
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
