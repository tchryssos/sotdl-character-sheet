export const HOME_ROUTE = '/';
export const MY_CHARACTERS_ROUTE = '/profiles/me/characters';
export const SETTINGS_ROUTE = '/settings';

export const createCharacterSheetRoute = (id: number | 'new') =>
  `/characters/${id}`;
