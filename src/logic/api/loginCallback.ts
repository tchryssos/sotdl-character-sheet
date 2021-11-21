import { Session } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export const loginCallback = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  const test = '';
  return session;
};
