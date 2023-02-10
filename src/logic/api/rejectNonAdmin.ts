import { NextApiRequest, NextApiResponse } from 'next';

import { ErrorTypes } from '~/constants/notifications/errors';

import { getSessionUser } from './getSessionUser';

export const rejectNonAdmin = (req: NextApiRequest, res: NextApiResponse) => {
  const requestUser = getSessionUser(req, res);

  if (!requestUser || requestUser.role !== 'admin') {
    throw new Error(ErrorTypes.NotAuthorizedGeneric);
  }

  return requestUser;
};
