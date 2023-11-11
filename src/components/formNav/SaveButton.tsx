import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { IconButton } from '~/components/buttons/IconButton';
import { Save } from '~/components/icons/Save';
import { ERRORS, ErrorTypes } from '~/constants/notifications/errors';
import { SUCCESSES, SuccessTypes } from '~/constants/notifications/successes';
import { createCharacterRoute, NEW_ID } from '~/constants/routing/shared';
import { saveCharacter } from '~/logic/api/client/saveCharacter';
import { NotificationsContext } from '~/logic/contexts/notificationsContext';
import { createNotification } from '~/logic/utils/notifications';
import { ErrorResponse } from '~/typings/api';
import { CharacterData } from '~/typings/characters';
import { isSuccessfulCharacterResponse } from '~/typings/characters.guards';
import { RulebookType } from '~/typings/rulebooks';

interface SaveButtonProps {
  playerId: number;
  characterName: string;
  characterId?: string;
  rulebookName: RulebookType;
}

export function SaveButton({
  playerId,
  characterName,
  characterId = NEW_ID,
  rulebookName,
}: SaveButtonProps) {
  const [isSaving, setisSaving] = useState(false);
  const { addNotifications } = useContext(NotificationsContext);
  const { getValues } = useFormContext();

  const { push } = useRouter();

  const onSave = async () => {
    setisSaving(true);
    try {
      const resp = await saveCharacter({
        id: characterId as number | typeof NEW_ID,
        characterData: getValues() as CharacterData,
        playerId,
        rulebookName,
        name: characterName,
        imageUrl: null,
      });
      if (isSuccessfulCharacterResponse(resp)) {
        addNotifications([
          createNotification(SUCCESSES[SuccessTypes.CharacterSaved]),
        ]);
        if (characterId === NEW_ID) {
          push(createCharacterRoute(resp.id));
        }
      } else {
        addNotifications([
          createNotification(
            ERRORS[(resp as ErrorResponse).error as ErrorTypes]
          ),
        ]);
      }
    } catch (e) {
      addNotifications([
        createNotification(
          ERRORS['Something went wrong saving your character']
        ),
      ]);
    }
    setisSaving(false);
  };

  return (
    <IconButton isLoading={isSaving} type="submit" onClick={onSave}>
      <Save title="Save character" titleId="save-character" />
    </IconButton>
  );
}
