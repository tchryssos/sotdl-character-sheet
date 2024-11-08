import { useUser } from '@auth0/nextjs-auth0';
import { useTheme } from '@emotion/react';
import { mdiStarBoxMultiple } from '@mdi/js';
import Icon from '@mdi/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { CloneButton } from '~/components/formNav/CloneButton';
import { DeleteButton } from '~/components/formNav/DeleteButton';
import { EditContext } from '~/logic/contexts/editContext';
import { useIsNewCharacter } from '~/logic/hooks/useIsNewCharacter';
import { RulebookType } from '~/typings/rulebooks';
import { StrictSessionUser } from '~/typings/user';

import { IconButton } from '../buttons/IconButton';
import { Pencil } from '../icons/Pencil';
import { SaveButton } from './SaveButton';

export interface QuickAccessProps {
  showQuickAccess: boolean;
  setShowQuickAccess: (show: boolean) => void;
}

type NavButtonProps = {
  isMyCharacter: boolean;
  rulebookName: RulebookType;
  characterName: string;
  quickAccess?: QuickAccessProps;
};

export function FormNavBaseButtons({
  isMyCharacter,
  rulebookName,
  characterName,
  quickAccess,
}: NavButtonProps) {
  const { user } = useUser();
  const { isEditMode, setIsEditMode } = useContext(EditContext);
  const { query } = useRouter();
  const isNew = useIsNewCharacter();
  const theme = useTheme();

  return (
    <>
      {user && (
        <>
          {!isMyCharacter && !isNew && (
            <CloneButton
              characterName={characterName}
              playerId={(user as StrictSessionUser).id}
              rulebookName={rulebookName}
            />
          )}
          {isMyCharacter && isEditMode && (
            <DeleteButton
              characterId={parseInt(query.id as string, 10)}
              playerId={(user as StrictSessionUser).id}
            />
          )}
          {(isMyCharacter || isNew) && (
            <SaveButton
              characterId={query.id as string}
              characterName={characterName}
              playerId={(user as StrictSessionUser).id}
              rulebookName={rulebookName}
            />
          )}
        </>
      )}
      <IconButton onClick={() => setIsEditMode(!isEditMode)}>
        <Pencil
          color={isEditMode ? 'primary' : 'text'}
          title="Edit pencil"
          titleId="edit-pencil-icon"
        />
      </IconButton>
      {quickAccess && (
        <IconButton
          onClick={() =>
            quickAccess.setShowQuickAccess(!quickAccess.showQuickAccess)
          }
        >
          <Icon
            color={
              quickAccess.showQuickAccess
                ? theme.colors.primary
                : theme.colors.text
            }
            path={mdiStarBoxMultiple}
            title={
              quickAccess.showQuickAccess
                ? 'Close Quick Access'
                : 'Open Quick Access'
            }
          />
        </IconButton>
      )}
    </>
  );
}
