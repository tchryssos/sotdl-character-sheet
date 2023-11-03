import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useFormContext } from 'react-hook-form';

import { FormNavBaseButtons } from '~/components/formNav/FormNavBaseButtons';
import { NavContext } from '~/logic/contexts/navContext';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

interface FormNavProps {
  isMyCharacter: boolean;
}

export function FormNav({ isMyCharacter }: FormNavProps) {
  const { watch } = useFormContext<SotwwCharacterData>();

  const name = watch('name');

  const { iconPortalNode, headerPortalNode, setDocTitle } =
    useContext(NavContext);

  useEffect(() => {
    const title = `${name}`;
    setDocTitle(title);
  }, [name, setDocTitle]);

  return (
    <>
      {iconPortalNode &&
        createPortal(
          <FormNavBaseButtons
            characterName={name}
            isMyCharacter={isMyCharacter}
            rulebookName="sotww"
          />,
          iconPortalNode
        )}
    </>
  );
}
