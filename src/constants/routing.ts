// CLIENT ROUTES
export const HOME_ROUTE = '/';
export const MY_CHARACTERS_ROUTE = '/profiles/me/characters';
export const SETTINGS_ROUTE = '/settings';

export const createCharacterSheetRoute = (id: number | string) =>
  `/characters/${id}`;

export const NEW_CHARACTER_ID = 'new';

// API ROUTES
export const CREATE_CHARACTER_ROUTE = '/api/characters/create';
export const createCharacterApiRoute = (id: number | string) =>
  `/api/${createCharacterSheetRoute(id)}`;
