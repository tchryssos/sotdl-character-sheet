export const CHARACTERS_PATH = 'characters';
export const USERS_PATH = 'users';
export const SETTINGS_PATH = 'settings';
export const RULEBOOKS_PATH = 'rulebooks';

export const NEW_ID = 'new';

export const createCharacterRoute = (id: number | string, rulebook: string) =>
  `/${CHARACTERS_PATH}/${rulebook}/${id}`;
export const createUsersRoute = (id: number | string) => `/${USERS_PATH}/${id}`;
export const createRulebookRoute = (id: number | string) =>
  `/${RULEBOOKS_PATH}/${id}`;
