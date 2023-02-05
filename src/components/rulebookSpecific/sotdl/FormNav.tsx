import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFormContext } from 'react-hook-form';

import { MoveFile } from '~/components/icons/MoveFile';
import { createCharacterRoute, NEW_ID } from '~/constants/routing/shared';
import { SOTDL_NAME } from '~/constants/sotdl/game';
import { saveCharacter } from '~/logic/api/client/saveCharacter';
import { EditContext } from '~/logic/contexts/editContext';
import { NavContext } from '~/logic/contexts/navContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { isSuccessfulCharacterResponse } from '~/typings/characters.guards';
import { SotdlCharacterData } from '~/typings/sotdl/characterData';
import { StrictSessionUser } from '~/typings/user';

import { IconButton } from '../../buttons/IconButton';
import { Pencil } from '../../icons/Pencil';
import { Save } from '../../icons/Save';
import { LoadingStatus } from '../../icons/StatusIcon';

interface FormNavProps {
  isMyCharacter: boolean;
}
interface SaveButtonProps {
  playerId: number;
}

const SaveButton: React.FC<SaveButtonProps> = ({ playerId }) => {
  const [saveStatus, setSaveStatus] = useState<LoadingStatus>('neutral');
  const { query } = useRouter();
  const { watch, getValues } = useFormContext();

  const { push } = useRouter();

  const characterName: string = watch<keyof SotdlCharacterData>('name');
  const characterData = getValues() as SotdlCharacterData;

  const onSave = async () => {
    setSaveStatus('loading');
    const resp = await saveCharacter({
      id: query.id as number | typeof NEW_ID,
      characterData,
      playerId,
      rulebookName: SOTDL_NAME,
      name: characterName,
      imageUrl: null,
    });
    if (isSuccessfulCharacterResponse(resp)) {
      setSaveStatus('success');
      if (query.id === NEW_ID) {
        push(createCharacterRoute(resp.id));
      }
    } else {
      setSaveStatus('error');
    }
  };

  return (
    <IconButton
      hasError={saveStatus === 'error'}
      isLoading={saveStatus === 'loading'}
      isNeutral={saveStatus === 'neutral'}
      isSuccessful={saveStatus === 'success'}
      type="submit"
      onClick={onSave}
    >
      <Save title="Save character" titleId="save-character" />
    </IconButton>
  );
};
// END - Icons and Buttons - End

const NavButtons: React.FC<Pick<FormNavProps, 'isMyCharacter'>> = ({
  isMyCharacter,
}) => {
  const { user } = useUser();
  const { isEditMode, setIsEditMode } = useContext(EditContext);

  return (
    <>
      {user && !isMyCharacter && (
        <IconButton>
          <MoveFile color="text" title="Add to my characters" />
        </IconButton>
      )}
      {user && isMyCharacter && (
        <SaveButton playerId={(user as StrictSessionUser).id} />
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
};

export const FormNav: React.FC<FormNavProps> = ({ isMyCharacter }) => {
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
};
