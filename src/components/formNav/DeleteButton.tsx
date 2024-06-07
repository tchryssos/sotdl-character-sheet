import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import { IconButton } from '~/components/buttons/IconButton';
import { ERRORS, ErrorTypes } from '~/constants/notifications/errors';
import { SUCCESSES, SuccessTypes } from '~/constants/notifications/successes';
import { createUsersRoute } from '~/constants/routing/shared';
import { markCharacterInactive } from '~/logic/api/client/deleteCharacter';
import { NotificationsContext } from '~/logic/contexts/notificationsContext';
import { createNotification } from '~/logic/utils/notifications';
import { isErrorResponse } from '~/typings/sotdl/api.guards';

import { DeactivateCharacterDialog } from '../dialog/DeactivateCharacterDialog';
import { Sleep } from '../icons/Sleep';

interface DeleteButtonProps {
  characterId: number;
  playerId: number;
}

export function DeleteButton({ characterId, playerId }: DeleteButtonProps) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { push } = useRouter();
  const { addNotifications } = useContext(NotificationsContext);
  const { user } = useUser();

  const onDeactivate = async () => {
    const resp = await markCharacterInactive(characterId, true);
    setIsConfirmModalOpen(false);

    if (isErrorResponse(resp)) {
      addNotifications([createNotification(ERRORS[resp.error as ErrorTypes])]);
    } else {
      addNotifications([
        createNotification(SUCCESSES[SuccessTypes.CharacterMadeInactive]),
      ]);
      push(createUsersRoute(playerId));
    }
  };

  return (
    <>
      <DeactivateCharacterDialog
        isOpen={isConfirmModalOpen}
        isPaid={Boolean(user?.isPaid)}
        setIsOpen={setIsConfirmModalOpen}
        onDeactivate={onDeactivate}
      />
      <IconButton onClick={() => setIsConfirmModalOpen(true)}>
        <Sleep color="text" title="Deactivate character" />
      </IconButton>
    </>
  );
}
