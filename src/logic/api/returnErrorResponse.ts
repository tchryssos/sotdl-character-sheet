import { NextApiResponse } from 'next';

import { NOT_AUTHORIZED_MESSAGE } from '~/constants/errors';

export const returnErrorResponse = (res: NextApiResponse, e: Error) => {
  switch (e.message) {
    case NOT_AUTHORIZED_MESSAGE:
      res.status(401).json({ error: NOT_AUTHORIZED_MESSAGE });
      break;
    default:
      res.status(500).json({ error: e.message });
  }
};
