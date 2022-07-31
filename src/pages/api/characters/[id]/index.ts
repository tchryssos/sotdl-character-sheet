import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

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

    res.status(200).json(character);
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
};

const patchCharacter = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;
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
      res.status(500).json({ error: (e as Error).message });
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
