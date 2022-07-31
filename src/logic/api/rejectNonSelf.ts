import { NextApiRequest, NextApiResponse } from 'next';

import { NOT_AUTHORIZED_MESSAGE } from '~/constants/errors';

import { getSessionUser } from './getSessionUser';

export const rejectNonSelf = (
  req: NextApiRequest,
  res: NextApiResponse,
  resourceUserId: string | number
) => {
  const reqUser = getSessionUser(req, res);

  if (
    !reqUser ||
    (String(reqUser.id) !== String(resourceUserId) && reqUser.role !== 'admin')
  ) {
    throw new Error(NOT_AUTHORIZED_MESSAGE);
  } else {
    return reqUser;
  }
};
