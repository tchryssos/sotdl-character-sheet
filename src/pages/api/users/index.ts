import { NextApiHandler } from 'next';

import { prisma } from '~/logic/utils/prisma';

const AllUsers: NextApiHandler = async (req, res) => {
  try {
    const { query } = req;
    const { search } = query;

    const searchQuery = search
      ? {
          where: {
            email: {
              search: typeof search === 'string' ? search : search.join(','),
            },
          },
        }
      : undefined;

    const users = await prisma.user.findMany(searchQuery);

    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
};

export default AllUsers;
