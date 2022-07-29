export const CHARACTERS_PATH = 'characters';
export const PROFILES_PATH = 'profiles';
export const SETTINGS_PATH = 'settings';
export const RULEBOOKS_PATH = 'rulebooks';

export const NEW_ID = 'new';

export const createCharacterRoute = (id: number | string) =>
  `/${CHARACTERS_PATH}/${id}`;
export const createProfileRoute = (id: number | string) =>
  `/${PROFILES_PATH}/${id}`;
export const createRulebookRoute = (id: number | string) =>
  `/${RULEBOOKS_PATH}/${id}`;
