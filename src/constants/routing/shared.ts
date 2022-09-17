import { RulebookType } from '~/typings/rulebooks';

export const CHARACTERS_PATH = 'characters';
export const USERS_PATH = 'users';
export const SETTINGS_PATH = 'settings';
export const RULEBOOKS_PATH = 'rulebooks';

export const NEW_ID = 'new';
export const CREATE_ID = 'create';

export const createCharacterRoute = (
  id: number | string,
  rulebook?: RulebookType
) => `/${CHARACTERS_PATH}/${id}${rulebook ? `?rulebook=${rulebook}` : ''}`;
export const createUsersRoute = (id: number | string) => `/${USERS_PATH}/${id}`;
export const createRulebookRoute = (id: number | string) =>
  `/${RULEBOOKS_PATH}/${id}`;
