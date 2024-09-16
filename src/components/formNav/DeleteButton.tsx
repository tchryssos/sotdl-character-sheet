import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import { IconButton } from '~/components/buttons/IconButton';
import { ConfirmationDialog } from '~/components/dialog/ConfirmationDialog';
import { Delete } from '~/components/icons/Delete';
import { ERRORS, ErrorTypes } from '~/constants/notifications/errors';
import { SUCCESSES, SuccessTypes } from '~/constants/notifications/successes';
import { createUsersRoute } from '~/constants/routing/shared';
import { deleteCharacter } from '~/logic/api/client/deleteCharacter';
import { NotificationsContext } from '~/logic/contexts/notificationsContext';
import { createNotification } from '~/logic/utils/notifications';
import { isErrorResponse } from '~/typings/sotdl/api.guards';

interface DeleteButtonProps {
  characterId: number;
  playerId: number;
}

export function DeleteButton({ characterId, playerId }: DeleteButtonProps) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { push } = useRouter();
  const { addNotifications } = useContext(NotificationsContext);

  const onDelete = async () => {
    const resp = await deleteCharacter(characterId);
    setIsConfirmModalOpen(false);

    if (isErrorResponse(resp)) {
      addNotifications([createNotification(ERRORS[resp.error as ErrorTypes])]);
    } else {
      addNotifications([
        createNotification(SUCCESSES[SuccessTypes.CharacterDeleted]),
      ]);
      push(createUsersRoute(playerId));
    }
  };

  return (
    // Focus trap on dialog adds two observer elements, but if those get caught in
    // a flexbox with a gap or something, they shift the layout. This box makes sure
    // that this whole button and dialog get treated as one element
    <div>
      <ConfirmationDialog
        cancel={{ onClick: () => setIsConfirmModalOpen(false) }}
        confirm={{ onClick: onDelete, label: 'Delete', severity: 'danger' }}
        describedById="delete-character-description"
        labeledById="delete-character"
        message="This character will be removed from your account and no longer accessible by you or others."
        open={isConfirmModalOpen}
        title="Delete character?"
      />
      <IconButton onClick={() => setIsConfirmModalOpen(true)}>
        <Delete color="text" title="Delete character" />
      </IconButton>
    </div>
  );
}
