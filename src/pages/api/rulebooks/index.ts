import { NextApiHandler } from 'next';

import { returnErrorResponse } from '~/logic/api/returnErrorResponse';
import { prisma } from '~/logic/utils/prisma';

const GetAllRulebooks: NextApiHandler = async (_, res) => {
  try {
    const rulebooks = await prisma.rulebook.findMany({
      orderBy: [{ name: 'asc' }],
    });
    res.status(200).json(rulebooks);
  } catch (e) {
    returnErrorResponse(res, e as Error);
  }
};

export default GetAllRulebooks;
