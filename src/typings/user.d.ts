import { user } from '@prisma/client';

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
  role: 'player' | 'admin';
};

export type StrictSessionUser = StrictUser & {
  authProviderData: GoogleUser | Auth0User;
};
