import { createContext } from 'react';

interface EditContextProps {
  isEditMode: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
}

export const EditContext = createContext<EditContextProps>({
  isEditMode: false,
  setIsEditMode: () => null,
});
