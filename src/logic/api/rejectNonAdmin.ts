import { NextApiRequest, NextApiResponse } from 'next';

import { NOT_AUTHORIZED_MESSAGE } from '~/constants/errors';

import { getSessionUser } from './getSessionUser';

export const rejectNonAdmin = (req: NextApiRequest, res: NextApiResponse) => {
  const requestUser = getSessionUser(req, res);

  if (!requestUser || requestUser.role !== 'admin') {
    throw new Error(NOT_AUTHORIZED_MESSAGE);
  }

  return requestUser;
};
