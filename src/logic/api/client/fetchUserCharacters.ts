import { createUsersCharactersApiRoute } from '~/constants/routing/api';

export const fetchUserCharacters = async (id: string) => {
  try {
    const resp = await fetch(createUsersCharactersApiRoute(id), {
      method: 'GET',
    });
    const respData = await resp.json();

    return respData;
  } catch (e) {
    return { error: 'Something went wrong fetching characters' };
  }
};
