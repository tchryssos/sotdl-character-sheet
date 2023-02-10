import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { ErrorTypes } from '~/constants/notifications/errors';
import { getSessionUser } from '~/logic/api/getSessionUser';
import { returnErrorResponse } from '~/logic/api/returnErrorResponse';
import { prisma } from '~/logic/utils/prisma';
import { CharacterSaveData } from '~/typings/characters';

const getCharacter = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const character = await prisma.character.findUnique({
      where: {
        id: parseInt(id as string, 10),
      },
    });

    if (!character) {
      throw new Error(ErrorTypes.CharacterNotFound);
    }

    res.status(200).json(character);
  } catch (e) {
    returnErrorResponse(res, e as Error);
  }
};

const patchCharacter = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;

      const requestUser = getSessionUser(req, res);

      const currCharacter = await prisma.character.findUnique({
        where: {
          id: parseInt(id as string, 10),
        },
      });

      if (!currCharacter) {
        throw new Error(ErrorTypes.CharacterNotFound);
      }

      if (
        currCharacter?.playerId !== requestUser?.id &&
        requestUser?.role !== 'admin'
      ) {
        throw new Error(ErrorTypes.NotAuthorizedGeneric);
      }

      const body: CharacterSaveData = await JSON.parse(req.body);

      const character = await prisma.character.update({
        where: {
          id: parseInt(id as string, 10),
        },
        data: {
          name: body.name,
          characterData: body.characterData!,
          lastModifiedOn: new Date(),
        },
      });

      res.status(200).json(character);
    } catch (e) {
      returnErrorResponse(res, e as Error);
    }
  }
);

const handleRequest: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method === 'PATCH') {
    await patchCharacter(req, res);
  } else {
    await getCharacter(req, res);
  }
};

export default handleRequest;
