import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import { getSessionUser } from '~/logic/api/getSessionUser';
import { returnErrorResponse } from '~/logic/api/returnErrorResponse';
import { prisma } from '~/logic/utils/prisma';
import { CharacterSaveData } from '~/typings/characters';

const createCharacter = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const user = await getSessionUser(req, res);

      if (!user) {
        throw new Error('No user found');
      }

      const body: CharacterSaveData = await JSON.parse(req.body);
      const now = new Date();

      const newCharacter = await prisma.character.create({
        data: {
          player: {
            connect: {
              id: user.id,
            },
          },
          rulebook: {
            connect: {
              name: body.rulebookName,
            },
          },
          createdOn: now,
          lastModifiedOn: now,
          name: body.name,
          characterData: body.characterData || {},
        },
      });
      res.status(200).json(newCharacter);
    } catch (e) {
      returnErrorResponse(res, e as Error);
    }
  }
);

export default withApiAuthRequired(createCharacter);
