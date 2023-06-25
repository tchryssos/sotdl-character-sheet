import {
  CREATE_CHARACTER_API_ROUTE,
  createCharacterApiRoute,
} from '~/constants/routing/api';
import { NEW_ID } from '~/constants/routing/shared';
import { ApiResponse } from '~/typings/api';
import {
  CharacterData,
  CharacterSaveData,
  StrictCharacter,
} from '~/typings/characters';

export const saveCharacter = async (
  data: CharacterSaveData
): Promise<ApiResponse<StrictCharacter<CharacterData>>> => {
  const { name, characterData, playerId, id, rulebookName } = data;
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
        rulebookName,
      }),
    }
  );

  const respData: ApiResponse<StrictCharacter<CharacterData>> =
    await resp.json();

  return respData;
};
