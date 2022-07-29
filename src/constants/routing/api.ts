import {
  CHARACTERS_PATH,
  createCharacterRoute,
  createProfileRoute,
  createRulebookRoute,
} from './shared';

const API_PREFIX = '/api';

// START - CHARACTER ROUTES - START //
export const CREATE_CHARACTER_ROUTE = `${API_PREFIX}/${CHARACTERS_PATH}/new/create`;

export const createCharacterApiRoute = (id: number | string) =>
  `${API_PREFIX}${createCharacterRoute(id)}`;
// END - CHARACTER ROUTES - END //

// START - PROFILE ROUTES - START //
export const createProfileApiRoute = (id: number | string) =>
  `${API_PREFIX}${createProfileRoute(id)}`;

export const createProfileCharactersApiRoute = (id: number | string) =>
  `${createProfileApiRoute(id)}/${CHARACTERS_PATH}`;
// END - PROFILE ROUTES - END //

// START - RULEBOOK ROUTES - START
export const createRulebooksApiRoute = (id: number | string) =>
  `${API_PREFIX}${createRulebookRoute(id)}`;
// END - RULEBOOK ROUTES - END
