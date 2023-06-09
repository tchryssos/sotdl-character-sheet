import { useMemo, useState } from 'react';

export const useSheetState = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isMyCharacter, setIsMyCharacter] = useState(true);

  const editProviderVal = useMemo(
    () => ({ isEditMode, setIsEditMode }),
    [isEditMode, setIsEditMode]
  );

  return {
    isLoading,
    setIsLoading,
    isEditMode,
    setIsEditMode,
    isMyCharacter,
    setIsMyCharacter,
    editProviderVal,
  };
};
