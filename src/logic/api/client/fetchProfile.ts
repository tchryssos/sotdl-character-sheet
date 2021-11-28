import { createProfileApiRoute } from '~/constants/routing';

export const fetchProfile = async (id: string) => {
  try {
    const resp = await fetch(createProfileApiRoute(id), {
      method: 'GET',
    });
    const respData = await resp.json();

    return respData;
  } catch (e) {
    return { error: 'Something went wrong fetching this profile' };
  }
};
