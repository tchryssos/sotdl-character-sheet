import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiHandler } from 'next';

import { ErrorTypes } from '~/constants/notifications/errors';
import { rejectNonAdminOrSelf } from '~/logic/api/rejectNonAdminOrSelf';
import { returnErrorResponse } from '~/logic/api/returnErrorResponse';

export type MarkInactiveBody = {
  inactive: 'true' | 'false';
};

const markInactive: NextApiHandler = withApiAuthRequired(async (req, res) => {
  const { method } = req;
  if (method !== 'PATCH') {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    const { id } = req.query;
    const parsedId = parseInt(id as string, 10);

    const currCharacter = await prisma.character.findUnique({
      where: {
        id: parsedId,
      },
    });

    if (!currCharacter || currCharacter.deleted) {
      throw new Error(ErrorTypes.CharacterNotFound);
    }

    rejectNonAdminOrSelf(req, res, currCharacter.playerId);

    const { body } = req as { body: MarkInactiveBody };

    const inactive = await prisma.character.update({
      id: parsedId,
      data: {
        inactive: Boolean(body.inactive === 'true'),
      },
    });

    res.status(200).json(inactive);
  } catch (e) {
    returnErrorResponse(res, e as Error);
  }
});

export default markInactive;
