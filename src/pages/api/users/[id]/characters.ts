import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiHandler } from 'next';

import { returnErrorResponse } from '~/logic/api/returnErrorResponse';
import { prisma } from '~/logic/utils/prisma';

const fetchUserCharacters: NextApiHandler = withApiAuthRequired(
  async (req, res) => {
    try {
      const { id } = req.query;

      const characters = await prisma.character.findMany({
        where: {
          playerId: parseInt(id as string, 10),
          deleted: false,
        },
        orderBy: [
          {
            createdOn: 'asc',
          },
        ],
      });

      res.status(200).json(characters);
    } catch (e) {
      returnErrorResponse(res, e as Error);
    }
  }
);

export default fetchUserCharacters;
