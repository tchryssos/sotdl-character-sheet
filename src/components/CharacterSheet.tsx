import { Form as FormComponent } from '~/components/form/Form';
import { EditContext } from '~/logic/contexts/editContext';
import { useSheetHotkeys } from '~/logic/hooks/useSheetHotkeys';
import { useSheetState } from '~/logic/hooks/useSheetState';

import { LoadingIntermediary } from './form/LoadingIntermediary';
import { FormNav } from './rulebookSpecific/sotdl/FormNav';

type CharacterSheetProps<T> = {
  children: React.ReactNode | React.ReactNode[];
  defaultValues: T;
};

export function CharacterSheet<T extends Record<string, unknown>>({
  children,
  defaultValues,
}: CharacterSheetProps<T>) {
  const {
    isLoading,
    isEditMode,
    setIsEditMode,
    setIsLoading,
    isMyCharacter,
    setIsMyCharacter,
  } = useSheetState();

  useSheetHotkeys(isEditMode, setIsEditMode);

  return (
    <EditContext.Provider value={{ isEditMode, setIsEditMode }}>
      <FormComponent defaultValues={defaultValues} onSubmit={() => undefined}>
        <LoadingIntermediary
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setIsMyCharacter={setIsMyCharacter}
        >
          <FormNav isMyCharacter={isMyCharacter} />
          {children}
        </LoadingIntermediary>
      </FormComponent>
    </EditContext.Provider>
  );
}
