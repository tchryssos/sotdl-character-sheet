import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { ErrorTypes } from '~/constants/notifications/errors';
import { SuccessTypes } from '~/constants/notifications/successes';
import { rejectNonAdminOrSelf } from '~/logic/api/rejectNonAdminOrSelf';
import { returnErrorResponse } from '~/logic/api/returnErrorResponse';
import { prisma } from '~/logic/utils/prisma';
import { CharacterSaveData } from '~/typings/characters';

const getCharacter = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const parsedID = parseInt(id as string, 10);

    if (Number.isNaN(parsedID)) {
      throw new Error(ErrorTypes.CharacterNotFound);
    }

    const character = await prisma.character.findUnique({
      where: {
        id: parseInt(id as string, 10),
      },
    });

    if (!character || character.deleted) {
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

      const currCharacter = await prisma.character.findUnique({
        where: {
          id: parseInt(id as string, 10),
        },
      });

      if (!currCharacter || currCharacter.deleted) {
        throw new Error(ErrorTypes.CharacterNotFound);
      }

      rejectNonAdminOrSelf(req, res, currCharacter.playerId);

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

const deleteCharacter = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;

      const currCharacter = await prisma.character.findUnique({
        where: {
          id: parseInt(id as string, 10),
        },
      });

      if (!currCharacter || currCharacter.deleted) {
        throw new Error(ErrorTypes.CharacterNotFound);
      }

      rejectNonAdminOrSelf(req, res, currCharacter.playerId);

      await prisma.character.update({
        where: {
          id: parseInt(id as string, 10),
        },
        data: {
          deleted: true,
          lastModifiedOn: new Date(),
        },
      });

      res.status(200).json(SuccessTypes.CharacterDeleted);
    } catch (e) {
      returnErrorResponse(res, e as Error);
    }
  }
);

const handleRequest: NextApiHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'PATCH':
      await patchCharacter(req, res);
      break;
    case 'GET':
      await getCharacter(req, res);
      break;
    case 'DELETE':
      await deleteCharacter(req, res);
      break;
    default:
      returnErrorResponse(res, new Error(ErrorTypes.SomethingWentWrong));
  }
};

export default handleRequest;
