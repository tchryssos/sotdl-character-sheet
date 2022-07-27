import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '~/logic/utils/prisma';
import { CharacterSaveData } from '~/typings/characters';

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
        rulebook: {
          connect: {
            id: body.rulebookId,
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
    res.status(500).json({ error: (e as Error).message });
  }
};

export default withApiAuthRequired(createCharacter);
