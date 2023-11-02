import styled from '@emotion/styled';

import { Form as FormComponent } from '~/components/form/Form';
import { EditContext } from '~/logic/contexts/editContext';
import { useSheetHotkeys } from '~/logic/hooks/useSheetHotkeys';
import { useSheetState } from '~/logic/hooks/useSheetState';
import { StrictCharacter } from '~/typings/characters';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

const SotwwCharacterSheet = styled(FormComponent)`
  padding-bottom: ${({ theme }) => theme.spacing[48]};
`;

interface SotwwCharacterSheetProps {
  character: StrictCharacter<SotwwCharacterData>;
}

export function CharacterSheet({ character }: SotwwCharacterSheetProps) {
  const {
    isEditMode,
    setIsEditMode,
    // isLoading,
    // setIsLoading,
    isMyCharacter,
    setIsMyCharacter,
    editProviderVal,
    queryTab,
  } = useSheetState();
  useSheetHotkeys(isEditMode, setIsEditMode);

  return (
    <EditContext.Provider value={editProviderVal}>
      <SotwwCharacterSheet
        defaultValues={character?.characterData || {}}
        onSubmit={() => undefined}
      >
        sheet
      </SotwwCharacterSheet>
    </EditContext.Provider>
  );
}
