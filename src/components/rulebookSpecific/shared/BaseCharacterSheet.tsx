import { Form as FormComponent } from '~/components/form/Form';
import { EditContext } from '~/logic/contexts/editContext';
import { useSheetHotkeys } from '~/logic/hooks/useSheetHotkeys';
import { useSheetState } from '~/logic/hooks/useSheetState';

import { LoadingIntermediary } from '../../form/LoadingIntermediary';

interface BaseCharacterSheetProps {
  defaultValues: Record<string, unknown>;
  children: (
    childProps: ReturnType<typeof useSheetState>
  ) => React.ReactNode | React.ReactNode[];
}

export const BaseCharacterSheet: React.FC<BaseCharacterSheetProps> = ({
  defaultValues,
  children,
}) => {
  const sheetState = useSheetState();
  const {
    isLoading,
    isEditMode,
    setIsEditMode,
    setIsLoading,
    setIsMyCharacter,
  } = sheetState;

  useSheetHotkeys(isEditMode, setIsEditMode);

  return (
    <EditContext.Provider value={{ isEditMode, setIsEditMode }}>
      <FormComponent defaultValues={defaultValues} onSubmit={() => undefined}>
        <LoadingIntermediary
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setIsMyCharacter={setIsMyCharacter}
        >
          {children(sheetState)}
        </LoadingIntermediary>
      </FormComponent>
    </EditContext.Provider>
  );
};
