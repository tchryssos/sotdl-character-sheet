import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useFormContext } from 'react-hook-form';

import { FormNavBaseButtons } from '~/components/formNav/FormNavBaseButtons';
import { NavContext } from '~/logic/contexts/navContext';
// import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { WwnCharacterData } from '~/typings/wwn/characterData';

interface FormNavProps {
  isMyCharacter: boolean;
}

export function FormNav({ isMyCharacter }: FormNavProps) {
  const { watch } = useFormContext<WwnCharacterData>();
  const name = watch('name');
  const className = watch('class_name');

  // const isXxs = useBreakpointsLessThan('xs');

  const { iconPortalNode, setNavTitle, setDocTitle } = useContext(NavContext);

  useEffect(() => {
    const title = `${name}${className ? ` - ${className}` : ''}`;
    setNavTitle(title);
    setDocTitle(title);
  }, [name, setNavTitle, setDocTitle, className]);

  return (
    <>
      {iconPortalNode &&
        createPortal(
          <FormNavBaseButtons
            characterName={name}
            isMyCharacter={isMyCharacter}
            rulebookName="wwn"
          />,
          iconPortalNode
        )}
    </>
  );
}
