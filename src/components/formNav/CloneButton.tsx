import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { IconButton } from '~/components/buttons/IconButton';
import { ConfirmationDialog } from '~/components/dialog/ConfirmationDialog';
import { MoveFile } from '~/components/icons/MoveFile';
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

interface CloneButtonProps {
  characterName: string;
  playerId: number;
  rulebookName: RulebookType;
}

export function CloneButton({
  characterName,
  playerId,
  rulebookName,
}: CloneButtonProps) {
  const [isConfirmCloneOpen, setIsConfirmCloneOpen] = useState(false);
  const { push } = useRouter();
  const { addNotifications } = useContext(NotificationsContext);
  const { getValues } = useFormContext();

  const onClone = async () => {
    const resp = await saveCharacter({
      id: NEW_ID,
      characterData: getValues() as CharacterData,
      rulebookName,
      name: characterName,
      imageUrl: null,
      playerId,
    });
    setIsConfirmCloneOpen(false);

    if (isSuccessfulCharacterResponse(resp)) {
      addNotifications([
        createNotification(SUCCESSES[SuccessTypes.CharacterCloned]),
      ]);
      push(createCharacterRoute(resp.id));
    } else {
      addNotifications([
        createNotification(ERRORS[(resp as ErrorResponse).error as ErrorTypes]),
      ]);
    }
  };

  return (
    <>
      <ConfirmationDialog
        cancel={{ onClick: () => setIsConfirmCloneOpen(false) }}
        confirm={{ onClick: onClone, label: 'Clone' }}
        describedById="clone-character-description"
        labeledById="clone-character"
        message="This will create a new character in your account that is a copy of this character."
        open={isConfirmCloneOpen}
        title="Clone character?"
      />
      <IconButton onClick={() => setIsConfirmCloneOpen(true)}>
        <MoveFile
          color={isConfirmCloneOpen ? 'success' : 'text'}
          title="Clone character"
        />
      </IconButton>
    </>
  );
}
