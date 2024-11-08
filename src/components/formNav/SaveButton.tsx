import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
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
  const [isSaving, setIsSaving] = useState(false);
  const { addNotifications } = useContext(NotificationsContext);
  const { getValues } = useFormContext();

  const { push } = useRouter();

  const isNewCharacter = characterId === NEW_ID;

  const onSave = useCallback(
    async (isAutosave?: boolean) => {
      setIsSaving(true);
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
          if (!isAutosave) {
            addNotifications([
              createNotification(SUCCESSES[SuccessTypes.CharacterSaved]),
            ]);
            if (isNewCharacter) {
              push(createCharacterRoute(resp.id));
            }
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
            ERRORS[
              isAutosave
                ? ErrorTypes.CharacterAutosaveFailure
                : ErrorTypes.CharacterSaveFailure
            ]
          ),
        ]);
      }
      setIsSaving(false);
    },
    [
      addNotifications,
      characterId,
      characterName,
      getValues,
      isNewCharacter,
      playerId,
      push,
      rulebookName,
    ]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isNewCharacter) {
        onSave(true);
      }
      // Autosave every 5 minutes
    }, 300000);
    return () => clearInterval(interval);
  }, [onSave, isNewCharacter]);

  return (
    <IconButton isLoading={isSaving} type="submit" onClick={() => onSave()}>
      <Save title="Save character" titleId="save-character" />
    </IconButton>
  );
}
