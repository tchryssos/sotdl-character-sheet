import { NextApiRequest, NextApiResponse } from 'next';

import { ErrorTypes } from '~/constants/notifications/errors';

import { getSessionUser } from './getSessionUser';

/**
 * A function that checks whether the user is either an admin or is modifying something that they own.
 * @returns The user object if user is authorized, otherwise throws an error.
 */
export const rejectNonAdminOrSelf = (
  req: NextApiRequest,
  res: NextApiResponse,
  resourceUserId: string | number
) => {
  const reqUser = getSessionUser(req, res);

  if (
    !reqUser ||
    (String(reqUser.id) !== String(resourceUserId) && reqUser.role !== 'admin')
  ) {
    throw new Error(ErrorTypes.NotAuthorizedGeneric);
  } else {
    return reqUser;
  }
};
