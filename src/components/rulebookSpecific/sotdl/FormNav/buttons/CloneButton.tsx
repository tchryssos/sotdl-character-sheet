import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import { IconButton } from '~/components/buttons/IconButton';
import { ConfirmationDialog } from '~/components/dialog/ConfirmationDialog';
import { MoveFile } from '~/components/icons/MoveFile';
import { ERRORS, ErrorTypes } from '~/constants/notifications/errors';
import { SUCCESSES, SuccessTypes } from '~/constants/notifications/successes';
import { createCharacterRoute, NEW_ID } from '~/constants/routing/shared';
import { SOTDL_NAME } from '~/constants/sotdl/game';
import { saveCharacter } from '~/logic/api/client/saveCharacter';
import { NotificationsContext } from '~/logic/contexts/notificationsContext';
import { createNotification } from '~/logic/utils/notifications';
import { isSuccessfulCharacterResponse } from '~/typings/characters.guards';
import { SotdlCharacterData } from '~/typings/sotdl/characterData';

interface CloneButtonProps {
  characterName: string;
  characterData: SotdlCharacterData;
  playerId: number;
}

export function CloneButton({
  characterData,
  characterName,
  playerId,
}: CloneButtonProps) {
  const [isConfirmCloneOpen, setIsConfirmCloneOpen] = useState(false);
  const { push } = useRouter();
  const { addNotifications } = useContext(NotificationsContext);

  const onClone = async () => {
    const resp = await saveCharacter({
      id: NEW_ID,
      characterData,
      rulebookName: SOTDL_NAME,
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
        createNotification(ERRORS[ErrorTypes.FreeCharacterLimit]),
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
