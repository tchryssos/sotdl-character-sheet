import { Text } from '~/components/Text';
import { useSheetHotkeys } from '~/logic/hooks/useSheetHotkeys';
import { useSheetState } from '~/logic/hooks/useSheetState';

export function CharacterSheet() {
  const {
    isEditMode,
    setIsEditMode,
    // isLoading,
    // setIsLoading,
    // isMyCharacter,
    // setIsMyCharacter,
  } = useSheetState();
  useSheetHotkeys(isEditMode, setIsEditMode);

  return <Text as="h2">SWN</Text>;
}
