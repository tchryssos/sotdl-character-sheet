import { useUser } from '@auth0/nextjs-auth0';
import { useEffect } from 'react';

import { Form as FormComponent } from '~/components/form/Form';
import { Text } from '~/components/Text';
import { DEFAULT_VALUES } from '~/constants/wwn/form';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { useSheetHotkeys } from '~/logic/hooks/useSheetHotkeys';
import { useSheetState } from '~/logic/hooks/useSheetState';
import { StrictCharacter } from '~/typings/characters';
import { WwnCharacterData } from '~/typings/wwn/characterData';

interface WwnCharacterSheetProps {
  character: StrictCharacter<WwnCharacterData>;
}

export function CharacterSheet({ character }: WwnCharacterSheetProps) {
  const {
    isEditMode,
    setIsEditMode,
    // isLoading,
    // setIsLoading,
    // isMyCharacter,
    setIsMyCharacter,
    editProviderVal,
  } = useSheetState();
  useSheetHotkeys(isEditMode, setIsEditMode);

  const { user } = useUser();

  useEffect(() => {
    setIsMyCharacter(character?.playerId === user?.id);
  }, [character?.playerId, setIsMyCharacter, user?.id]);

  const isLessThanSm = useBreakpointsLessThan('sm');
  const isLessThanXs = useBreakpointsLessThan('xs');

  return (
    <EditContext.Provider value={editProviderVal}>
      <FormComponent
        defaultValues={character?.characterData || DEFAULT_VALUES}
        onSubmit={() => undefined}
      >
        <div>FormNav!</div>
      </FormComponent>
    </EditContext.Provider>
  );
}
