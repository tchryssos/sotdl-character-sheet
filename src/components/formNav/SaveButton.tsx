import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { IconButton } from '~/components/buttons/IconButton';
import { Save } from '~/components/icons/Save';
import { ERRORS, ErrorTypes } from '~/constants/notifications/errors';
import { SUCCESSES, SuccessTypes } from '~/constants/notifications/successes';
import { createCharacterRoute, NEW_ID } from '~/constants/routing/shared';
import { FIVE_MINUTES_IN_MS } from '~/constants/time';
import { saveCharacter } from '~/logic/api/client/saveCharacter';
import { NotificationsContext } from '~/logic/contexts/notificationsContext';
import { createNotification } from '~/logic/utils/notifications';
import { ErrorResponse } from '~/typings/api';
import { CharacterData } from '~/typings/characters';
import { isSuccessfulCharacterResponse } from '~/typings/characters.guards';
import { RulebookType } from '~/typings/rulebooks';

import { FlexBox } from '../box/FlexBox';
import { Text } from '../Text';

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
  const [lastSaved, setLastSaved] = useState<{
    auto: boolean;
    date: Date | null;
  }>({
    auto: false,
    date: null,
  });

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
          setLastSaved({
            auto: Boolean(isAutosave),
            date: new Date(),
          });
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
    }, FIVE_MINUTES_IN_MS);
    return () => clearInterval(interval);
  }, [onSave, isNewCharacter]);

  const savedText = lastSaved.date
    ? capitalize(
        `${lastSaved.auto ? 'auto' : ''}saved
        ${lastSaved.date.toLocaleTimeString()}`
      )
    : '';

  return (
    <FlexBox alignItems="flex-end" gap={4}>
      {savedText && (
        <Text color="textAccent" marginBottom={4} variant="body-xs">
          {savedText}
        </Text>
      )}
      <IconButton isLoading={isSaving} type="submit" onClick={() => onSave()}>
        <Save title="Save character" titleId="save-character" />
      </IconButton>
    </FlexBox>
  );
}
