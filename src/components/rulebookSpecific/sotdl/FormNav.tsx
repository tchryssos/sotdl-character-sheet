import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useFormContext } from 'react-hook-form';

import { FormNavBaseButtons } from '~/components/formNav/FormNavBaseButtons';
import { NavContext } from '~/logic/contexts/navContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { SotdlCharacterData } from '~/typings/sotdl/characterData';

interface FormNavProps {
  isMyCharacter: boolean;
}

export function FormNav({ isMyCharacter }: FormNavProps) {
  const { watch } = useFormContext<SotdlCharacterData>();
  const name = watch('name');
  const ancestry = watch('ancestry');
  const novicePath = watch('novice_path');
  const expertPath = watch('expert_path');
  const masterPath = watch('master_path');

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
          <FormNavBaseButtons
            characterName={name}
            isMyCharacter={isMyCharacter}
            rulebookName="sotdl"
          />,
          iconPortalNode
        )}
    </>
  );
}
