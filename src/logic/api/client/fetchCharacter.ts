import { createCharacterApiRoute } from '~/constants/routing/api';

export const fetchCharacter = async (id: string) => {
  try {
    const resp = await fetch(createCharacterApiRoute(id), {
      method: 'GET',
    });
    const respData = await resp.json();

    return respData;
  } catch (e) {
    return { error: 'Something went wrong fetching your character' };
  }
};
