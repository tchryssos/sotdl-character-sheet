// CLIENT ROUTES
export const HOME_ROUTE = '/';
export const SETTINGS_ROUTE = '/settings';

export const createCharacterSheetRoute = (id: number | string) =>
  `/characters/${id}`;

export const NEW_CHARACTER_ID = 'new';

export const createProfileRoute = (id: number | string) => `/profiles/${id}`;

// API ROUTES
export const CREATE_CHARACTER_ROUTE = '/api/characters/new/create';
export const createCharacterApiRoute = (id: number | string) =>
  `/api/${createCharacterSheetRoute(id)}`;
export const createProfileApiRoute = (id: number | string) =>
  `/api/${createProfileRoute(id)}`;
