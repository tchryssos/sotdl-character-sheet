import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

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

export default getCharacter;
