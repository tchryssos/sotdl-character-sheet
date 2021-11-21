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

export interface User {
  authId?: string;
  createdOn?: string;
  id: number;
  lastModifiedOn: string;
  role?: 'player' | 'admin';
  authProviderData: GoogleUser | Auth0User;
}
