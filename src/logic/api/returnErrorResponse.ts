import { NextApiResponse } from 'next';

import { ErrorTypes } from '~/constants/notifications/errors';

export const returnErrorResponse = (res: NextApiResponse, e: Error) => {
  switch (e.message) {
    case ErrorTypes.NotAuthorizedGeneric:
      res.status(401).json({ error: ErrorTypes.NotAuthorizedGeneric });
      break;
    case ErrorTypes.FreeCharacterLimit:
      res.status(403).json({ error: ErrorTypes.FreeCharacterLimit });
      break;
    case ErrorTypes.CharacterNotFound:
      res.status(404).json({ error: ErrorTypes.CharacterNotFound });
      break;
    default:
      res.status(500).json({ error: ErrorTypes.SomethingWentWrong });
  }
};
