import { createCharacterApiRoute } from '~/constants/routing/api';
import { MarkInactiveBody } from '~/pages/api/characters/[id]/markInactive';
import { ApiResponse } from '~/typings/api';

export const markCharacterInactive = async (
  id: number,
  inactive: boolean
): Promise<ApiResponse<string>> => {
  const resp = await fetch(createCharacterApiRoute(id), {
    method: 'PATCH',
    body: JSON.stringify({ inactive: String(inactive) } as MarkInactiveBody),
  });

  const respData: ApiResponse<string> = await resp.json();

  return respData;
};

export const deleteCharacter = async (
  id: number
): Promise<ApiResponse<string>> => {
  const resp = await fetch(createCharacterApiRoute(id), {
    method: 'DELETE',
  });

  const respData: ApiResponse<string> = await resp.json();

  return respData;
};
