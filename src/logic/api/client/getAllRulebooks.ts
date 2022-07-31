import { ALL_RULEBOOKS_API_PATH } from '~/constants/routing/api';
import { StrictRulebook } from '~/typings/rulebooks';

export const getAllRulebooks = async () => {
  try {
    const resp = await fetch(ALL_RULEBOOKS_API_PATH, {
      method: 'GET',
    });
    if (resp.status >= 200 && resp.status <= 300) {
      const rulebooks: StrictRulebook[] = await resp.json();
      return rulebooks;
    }
    return undefined;
  } catch (e) {
    return undefined;
  }
};
