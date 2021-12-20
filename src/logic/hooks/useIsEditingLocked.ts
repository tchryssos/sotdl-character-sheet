import { useContext } from 'react';

import { EditContext } from '../contexts/editContext';

export const useIsEditingLocked = (alwaysEditable: boolean) => {
  const { isEditMode } = useContext(EditContext);
  return !isEditMode && !alwaysEditable;
};
