import { NextApiHandler } from 'next';

import { prisma } from '~/logic/utils/prisma';

const AllUsers: NextApiHandler = async (req, res) => {
  try {
    const { query } = req;
    const { search } = query;
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
};

export default AllUsers;
