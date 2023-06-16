import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useFormContext } from 'react-hook-form';

import { CloneButton } from '~/components/formNav/CloneButton';
import { DeleteButton } from '~/components/formNav/DeleteButton';
import { EditContext } from '~/logic/contexts/editContext';
import { NavContext } from '~/logic/contexts/navContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { useIsNewCharacter } from '~/logic/hooks/useIsNewCharacter';
import { SotdlCharacterData } from '~/typings/sotdl/characterData';
import { StrictSessionUser } from '~/typings/user';
import { WwnCharacterData } from '~/typings/wwn/characterData';

import { IconButton } from '../../buttons/IconButton';
import { SaveButton } from '../../formNav/SaveButton';
import { Pencil } from '../../icons/Pencil';

interface FormNavProps {
  isMyCharacter: boolean;
}
// END - Icons and Buttons - End

function NavButtons({ isMyCharacter }: Pick<FormNavProps, 'isMyCharacter'>) {
  const { user } = useUser();
  const { isEditMode, setIsEditMode } = useContext(EditContext);
  const { watch, getValues } = useFormContext();
  const { query } = useRouter();
  const isNew = useIsNewCharacter();

  const characterName: string = watch<keyof WwnCharacterData>('name');
  const characterData = getValues() as WwnCharacterData;

  return (
    <>
      {user && (
        <>
          {!isMyCharacter && !isNew && (
            <CloneButton<WwnCharacterData>
              characterData={characterData}
              characterName={characterName}
              playerId={(user as StrictSessionUser).id}
              rulebookName="wwn"
            />
          )}
          {isMyCharacter && isEditMode && (
            <DeleteButton
              characterId={parseInt(query.id as string, 10)}
              playerId={(user as StrictSessionUser).id}
            />
          )}
          {(isMyCharacter || isNew) && (
            <SaveButton<WwnCharacterData>
              characterData={characterData}
              characterId={query.id as string}
              characterName={characterName}
              playerId={(user as StrictSessionUser).id}
              rulebookName="wwn"
            />
          )}
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
