import { PrismaClient } from '@prisma/client';
import { NextApiHandler } from 'next';

const prisma = new PrismaClient();

const fetchProfile: NextApiHandler = async (req, res) => {
  try {
    const {
      query: { id },
    } = req;

    const profile = await prisma.user.findUnique({
      where: {
        id: parseInt(id as string, 10),
      },
    });
    res.status(200).json(profile);
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
};

export default fetchProfile;
