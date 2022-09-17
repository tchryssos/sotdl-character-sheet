import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { user } from '@prisma/client';
import { NextApiHandler } from 'next';

import { rejectNonSelf } from '~/logic/api/rejectNonSelf';
import { returnErrorResponse } from '~/logic/api/returnErrorResponse';
import { prisma } from '~/logic/utils/prisma';

const getUser: NextApiHandler = withApiAuthRequired(async (req, res) => {
  try {
    const {
      query: { id },
    } = req;

    const profile = await prisma.user.findUnique({
      where: {
        id: parseInt(id as string, 10),
      },
    });
    res.status(200).json(profile);
  } catch (e) {
    returnErrorResponse(res, e as Error);
  }
});

export type PatchUserData = Pick<user, 'email' | 'role'>;

const patchUser: NextApiHandler = withApiAuthRequired(async (req, res) => {
  try {
    const { id } = req.query;

    const requestUser = rejectNonSelf(req, res, id as string);

    const body: PatchUserData = await JSON.parse(req.body);

    const updateUser = await prisma.user.update({
      where: {
        id: parseInt(id as string, 10),
      },
      data: {
        email: body.email,
        lastModifiedOn: new Date(),
        ...(requestUser.role === 'admin' && {
          role: body.role,
        }),
      },
    });

    res.status(200).json(updateUser);
  } catch (e) {
    returnErrorResponse(res, e as Error);
  }
});

const handleRequest: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method === 'PATCH') {
    await patchUser(req, res);
  } else {
    await getUser(req, res);
  }
};

export default handleRequest;
