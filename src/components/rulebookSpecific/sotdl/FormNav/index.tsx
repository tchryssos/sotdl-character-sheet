import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useFormContext } from 'react-hook-form';

import { NEW_ID } from '~/constants/routing/shared';
import { EditContext } from '~/logic/contexts/editContext';
import { NavContext } from '~/logic/contexts/navContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { SotdlCharacterData } from '~/typings/sotdl/characterData';
import { StrictSessionUser } from '~/typings/user';

import { IconButton } from '../../../buttons/IconButton';
import { Pencil } from '../../../icons/Pencil';
import { CloneButton } from './buttons/CloneButton';
import { DeleteButton } from './buttons/DeleteButton';
import { SaveButton } from './buttons/SaveButton';

interface FormNavProps {
  isMyCharacter: boolean;
}
// END - Icons and Buttons - End

function NavButtons({ isMyCharacter }: Pick<FormNavProps, 'isMyCharacter'>) {
  const { user } = useUser();
  const { isEditMode, setIsEditMode } = useContext(EditContext);
  const { watch, getValues } = useFormContext();
  const { query } = useRouter();

  const characterName: string = watch<keyof SotdlCharacterData>('name');
  const characterData = getValues() as SotdlCharacterData;

  return (
    <>
      {user && !isMyCharacter && query.id !== NEW_ID && (
        <CloneButton
          characterData={characterData}
          characterName={characterName}
          playerId={(user as StrictSessionUser).id}
        />
      )}
      {user && isMyCharacter && (
        <>
          {isEditMode && (
            <DeleteButton
              characterId={parseInt(query.id as string, 10)}
              playerId={(user as StrictSessionUser).id}
            />
          )}
          <SaveButton
            characterData={characterData}
            characterId={query.id as string}
            characterName={characterName}
            playerId={(user as StrictSessionUser).id}
          />
        </>
      )}
      <IconButton onClick={() => setIsEditMode(!isEditMode)}>
        <Pencil
          color={isEditMode ? 'success' : 'text'}
          title="Edit pencil"
          titleId="edit-pencil-icon"
        />
      </IconButton>
    </>
  );
}

export function FormNav({ isMyCharacter }: FormNavProps) {
  const { watch } = useFormContext();
  const name: string | undefined = watch<keyof SotdlCharacterData>('name');
  const ancestry: string | undefined =
    watch<keyof SotdlCharacterData>('ancestry');
  const novicePath: string | undefined =
    watch<keyof SotdlCharacterData>('novice_path');
  const expertPath: string | undefined =
    watch<keyof SotdlCharacterData>('expert_path');
  const masterPath: string | undefined =
    watch<keyof SotdlCharacterData>('master_path');

  const isXxs = useBreakpointsLessThan('xs');

  const { iconPortalNode, setNavTitle, setDocTitle } = useContext(NavContext);

  useEffect(() => {
    const titleClass = masterPath || expertPath || novicePath || '';
    const title = `${name}${
      ancestry && !isXxs
        ? ` - ${ancestry}${titleClass ? ` ${titleClass}` : ''}`
        : ''
    }`;
    setNavTitle(title);
    setDocTitle(title);
  }, [
    name,
    ancestry,
    novicePath,
    expertPath,
    masterPath,
    setNavTitle,
    setDocTitle,
    isXxs,
  ]);

  return (
    <>
      {iconPortalNode &&
        createPortal(
          <NavButtons isMyCharacter={isMyCharacter} />,
          iconPortalNode
        )}
    </>
  );
}
