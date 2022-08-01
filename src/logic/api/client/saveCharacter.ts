import {
  CREATE_CHARACTER_API_ROUTE,
  createCharacterApiRoute,
} from '~/constants/routing/api';
import { NEW_ID } from '~/constants/routing/shared';
import { ApiResponse } from '~/typings/api';
import { CharacterSaveData, StrictCharacter } from '~/typings/characters';

export const saveCharacter = async (
  data: CharacterSaveData
): Promise<ApiResponse<StrictCharacter>> => {
  const { name, characterData, playerId, id } = data;
  const isCreateCharacter = id === NEW_ID;

  const resp = await fetch(
    // technically, query.id could be many strings or undefined
    // but routing logic prevents it from being anything other than a single string
    isCreateCharacter
      ? CREATE_CHARACTER_API_ROUTE
      : createCharacterApiRoute(id),
    {
      method: isCreateCharacter ? 'POST' : 'PATCH',
      body: JSON.stringify({
        id,
        name,
        characterData,
        playerId,
      }),
    }
  );

  const respData: ApiResponse<StrictCharacter> = await resp.json();

  return respData;
};
