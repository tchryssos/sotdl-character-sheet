/* eslint-disable no-underscore-dangle */
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import { FREE_USER_CHARACTER_LIMIT_MESSAGE } from '~/constants/notifications/errors';
import { FREE_USER_CHARACTER_LIMIT } from '~/constants/users';
import { getSessionUser } from '~/logic/api/getSessionUser';
import { returnErrorResponse } from '~/logic/api/returnErrorResponse';
import { prisma } from '~/logic/utils/prisma';
import { CharacterSaveData } from '~/typings/characters';

const createCharacter = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const user = getSessionUser(req, res);

      if (!user) {
        throw new Error('No user found');
      }

      // Check that newly created character won't exceed free user limit
      const isFreeUser = !user.isPaid;
      // TODO: SWITCH THIS BACK TO ISFREEUSER
      if (!isFreeUser) {
        const characterCountData = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
          include: {
            _count: {
              select: {
                characters: true,
              },
            },
          },
        });

        if (
          Number(characterCountData?._count.characters) >=
          FREE_USER_CHARACTER_LIMIT
        ) {
          throw new Error(FREE_USER_CHARACTER_LIMIT_MESSAGE);
        }
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
      res.status(200);
    } catch (e) {
      returnErrorResponse(res, e as Error);
    }
  }
);

export default withApiAuthRequired(createCharacter);
