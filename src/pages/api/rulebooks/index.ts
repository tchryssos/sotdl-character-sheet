import { NextApiHandler } from 'next';

import { prisma } from '~/logic/utils/prisma';

const GetAllRulebooks: NextApiHandler = async (_, res) => {
  try {
    const rulebooks = await prisma.rulebook.findMany();
    res.status(200).json(rulebooks);
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
};

export default GetAllRulebooks;
