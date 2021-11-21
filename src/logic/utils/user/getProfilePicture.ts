import { User } from '~/typings/user';

export const getProfilePicture = (user?: User) =>
  user?.authProviderData.picture;
