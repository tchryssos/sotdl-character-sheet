import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiHandler } from 'next';

import { rejectNonAdmin } from '~/logic/api/rejectNonAdmin';
import { returnErrorResponse } from '~/logic/api/returnErrorResponse';
import { prisma } from '~/logic/utils/prisma';

const AllUsers: NextApiHandler = withApiAuthRequired(async (req, res) => {
  try {
    rejectNonAdmin(req, res);

    const { query } = req;
    const { search } = query;

    const searchQuery = search
      ? {
          where: {
            email: {
              contains: typeof search === 'string' ? search : search.join(','),
            },
          },
        }
      : undefined;

    const users = await prisma.user.findMany({
      ...searchQuery,
      take: 10,
    });

    res.status(200).json(users);
  } catch (e) {
    returnErrorResponse(res, e as Error);
  }
});

export default AllUsers;
