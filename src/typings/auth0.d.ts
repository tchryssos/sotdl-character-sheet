import { User } from './user';

declare module '@auth0/nextjs-auth0' {
  interface UserProfile extends User {}
}
