import { user } from '@prisma/client';
import { Roles } from '~/constants/users';

interface GoogleUser {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
}

interface Auth0User {
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
}

export type StrictUser = Omit<user, 'role'> & {
  role: Roles;
  isPaid: boolean;
};

export type StrictSessionUser = StrictUser & {
  authProviderData: GoogleUser | Auth0User;
};
