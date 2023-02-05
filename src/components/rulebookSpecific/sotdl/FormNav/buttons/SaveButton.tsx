import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { IconButton } from '~/components/buttons/IconButton';
import { Save } from '~/components/icons/Save';
import { LoadingStatus } from '~/components/icons/StatusIcon';
import { createCharacterRoute, NEW_ID } from '~/constants/routing/shared';
import { SOTDL_NAME } from '~/constants/sotdl/game';
import { saveCharacter } from '~/logic/api/client/saveCharacter';
import { isSuccessfulCharacterResponse } from '~/typings/characters.guards';
import { SotdlCharacterData } from '~/typings/sotdl/characterData';

interface SaveButtonProps {
  playerId: number;
  characterName: string;
  characterData: SotdlCharacterData;
  characterId?: string;
}

export function SaveButton({
  playerId,
  characterData,
  characterName,
  characterId = NEW_ID,
}: SaveButtonProps) {
  const [saveStatus, setSaveStatus] = useState<LoadingStatus>('neutral');

  const { push } = useRouter();

  const onSave = async () => {
    setSaveStatus('loading');
    const resp = await saveCharacter({
      id: characterId as number | typeof NEW_ID,
      characterData,
      playerId,
      rulebookName: SOTDL_NAME,
      name: characterName,
      imageUrl: null,
    });
    if (isSuccessfulCharacterResponse(resp)) {
      setSaveStatus('success');
      if (characterId === NEW_ID) {
        push(createCharacterRoute(resp.id));
      }
    } else {
      setSaveStatus('error');
    }
  };

  return (
    <IconButton
      hasError={saveStatus === 'error'}
      isLoading={saveStatus === 'loading'}
      isNeutral={saveStatus === 'neutral'}
      isSuccessful={saveStatus === 'success'}
      type="submit"
      onClick={onSave}
    >
      <Save title="Save character" titleId="save-character" />
    </IconButton>
  );
}
