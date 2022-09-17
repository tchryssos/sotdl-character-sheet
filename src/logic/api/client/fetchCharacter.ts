import { createCharacterApiRoute } from '~/constants/routing/api';
import { StrictCharacter } from '~/typings/characters';

export const fetchCharacter = async (id: string) => {
  try {
    const resp = await fetch(createCharacterApiRoute(id), {
      method: 'GET',
    });
    const respData: StrictCharacter = await resp.json();
    return respData;
  } catch (e) {
    return { error: 'Something went wrong fetching your character' };
  }
};
