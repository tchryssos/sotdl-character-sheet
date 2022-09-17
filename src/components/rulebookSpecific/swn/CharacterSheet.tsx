import { Title } from '~/components/typography/Title';
import { useSheetHotkeys } from '~/logic/hooks/useSheetHotkeys';
import { useSheetState } from '~/logic/hooks/useSheetState';

export const CharacterSheet: React.FC = () => {
  const {
    isEditMode,
    setIsEditMode,
    // isLoading,
    // setIsLoading,
    // isMyCharacter,
    // setIsMyCharacter,
  } = useSheetState();
  useSheetHotkeys(isEditMode, setIsEditMode);

  return <Title>SWN</Title>;
};
