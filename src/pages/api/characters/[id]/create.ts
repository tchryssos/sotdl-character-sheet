import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { CharacterSaveData } from '~/typings/characters';

const prisma = new PrismaClient();

const createCharacter = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body: CharacterSaveData = await JSON.parse(req.body);

    const now = new Date();

    const newCharacter = await prisma.character.create({
      data: {
        player: {
          connect: {
            id: body.playerId,
          },
        },
        createdOn: now,
        lastModifiedOn: now,
        name: body.name,
        characterCode: body.characterCode,
      },
    });
    res.status(200).json(newCharacter);
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
};

export default withApiAuthRequired(createCharacter);
