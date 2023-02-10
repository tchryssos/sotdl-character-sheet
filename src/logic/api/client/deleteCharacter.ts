import { createCharacterApiRoute } from '~/constants/routing/api';
import { ApiResponse } from '~/typings/api';

export const deleteCharacter = async (
  id: number
): Promise<ApiResponse<string>> => {
  const resp = await fetch(createCharacterApiRoute(id), {
    method: 'DELETE',
  });

  const respData: ApiResponse<string> = await resp.json();

  return respData;
};
