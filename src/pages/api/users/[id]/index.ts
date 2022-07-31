import { user } from '@prisma/client';
import { NextApiHandler, NextApiRequest } from 'next';

import { prisma } from '~/logic/utils/prisma';

const getUser: NextApiHandler = async (req, res) => {
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
    res.status(500).json({ error: (e as Error).message });
  }
};

export type PatchUserData = Pick<user, 'email' | 'role'>;

const patchUser: NextApiHandler = async (req, res) => {
  try {
    const { id } = req.query;
    const body: PatchUserData = await JSON.parse(req.body);

    const updateUser = await prisma.user.update({
      where: {
        id: parseInt(id as string, 10),
      },
      data: {
        email: body.email,
        role: body.role,
        lastModifiedOn: new Date(),
      },
    });

    res.status(200).json(updateUser);
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
};

const handleRequest: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method === 'PATCH') {
    await patchUser(req, res);
  } else {
    await getUser(req, res);
  }
};

export default handleRequest;
