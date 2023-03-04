import { padStart, random } from 'lodash';

import { StrictSessionUser } from '~/typings/user';

export const getNameFromUser = (user?: StrictSessionUser) => {
  const { displayName, authProviderData } = user || {};

  return (
    displayName ||
    authProviderData?.nickname ||
    authProviderData?.name ||
    authProviderData?.email
  );
};

// For now, all image urls are one of the pre-defined icon images
// so we just look for the 3 digit icon image code in the url
// and use that for our RpgIcon component
export const getIconIdxFromUrl = (imageUrl?: string) => {
  if (imageUrl) {
    const iconIdx = imageUrl.match(/\d{3}/)?.[0];
    if (iconIdx) {
      return iconIdx as `${number}`;
    }
  }
  return padStart(String(random(0, 440)), 3, '0') as `${number}`;
};

export const getIconFromUser = (user?: StrictSessionUser) => {
  const { imageUrl } = user || {};
  return getIconIdxFromUrl(imageUrl);
};
