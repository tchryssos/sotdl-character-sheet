import { useUser } from '@auth0/nextjs-auth0';
import { useEffect } from 'react';

import { Text } from '~/components/Text';
import { useSheetHotkeys } from '~/logic/hooks/useSheetHotkeys';
import { useSheetState } from '~/logic/hooks/useSheetState';

interface WwnCharacterSheetProps {
  // character: StrictCharacter;
}

export function CharacterSheet({}) {
  const {
    isEditMode,
    setIsEditMode,
    // isLoading,
    // setIsLoading,
    // isMyCharacter,
    setIsMyCharacter,
  } = useSheetState();
  useSheetHotkeys(isEditMode, setIsEditMode);

  const { user } = useUser();

  useEffect(() => {
    setIsMyCharacter(character?.playerId === user?.id);
  }, [character?.playerId, setIsMyCharacter, user?.id]);

  return <Text as="h2">WWN</Text>;
}
