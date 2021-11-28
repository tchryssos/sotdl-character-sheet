import { PrismaClient } from '@prisma/client';
import { NextApiHandler } from 'next';

const prisma = new PrismaClient();

const fetchProfileCharacters: NextApiHandler = async (req, res) => {
  try {
    const { id } = req.query;

    const characters = await prisma.character.findMany({
      where: {
        playerId: parseInt(id as string, 10),
      },
      orderBy: [
        {
          createdOn: 'asc',
        },
      ],
    });

    res.status(200).json(characters);
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
};

export default fetchProfileCharacters;
