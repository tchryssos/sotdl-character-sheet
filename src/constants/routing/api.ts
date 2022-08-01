import {
  CHARACTERS_PATH,
  createCharacterRoute,
  createRulebookRoute,
  createUsersRoute,
  NEW_ID,
  RULEBOOKS_PATH,
  USERS_PATH,
} from './shared';

const API_PREFIX = '/api';

// START - CHARACTER ROUTES - START //
export const CREATE_CHARACTER_API_ROUTE = `${API_PREFIX}/${CHARACTERS_PATH}/${NEW_ID}/create`;

export const createCharacterApiRoute = (id: number | string) =>
  `${API_PREFIX}${createCharacterRoute(id)}`;
// END - CHARACTER ROUTES - END //

// START - Users ROUTES - START //
export const USERS_API_ROUTE = `${API_PREFIX}/${USERS_PATH}`;
export const createUserApiRoute = (id: number | string) =>
  `${API_PREFIX}${createUsersRoute(id)}`;

export const createUsersCharactersApiRoute = (id: number | string) =>
  `${createUserApiRoute(id)}/${CHARACTERS_PATH}`;
// END - PROFILE ROUTES - END //

// START - RULEBOOK ROUTES - START
export const createRulebookApiRoute = (id: number | string) =>
  `${API_PREFIX}${createRulebookRoute(id)}`;
export const ALL_RULEBOOKS_API_PATH = `${API_PREFIX}/${RULEBOOKS_PATH}`;
// END - RULEBOOK ROUTES - END
