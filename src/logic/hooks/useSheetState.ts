import { useState } from 'react';

export const useSheetState = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isMyCharacter, setIsMyCharacter] = useState(true);

  return {
    isLoading,
    setIsLoading,
    isEditMode,
    setIsEditMode,
    isMyCharacter,
    setIsMyCharacter,
  };
};
