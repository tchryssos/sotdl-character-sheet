import { createProfileCharactersApiRoute } from '~/constants/routing/api';

export const fetchProfileCharacters = async (id: string) => {
  try {
    const resp = await fetch(createProfileCharactersApiRoute(id), {
      method: 'GET',
    });
    const respData = await resp.json();

    return respData;
  } catch (e) {
    return { error: 'Something went wrong fetching characters' };
  }
};
