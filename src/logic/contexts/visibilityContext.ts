import { createContext } from 'react';

export type VisibilityObj = {
  [key: string]: {
    [key: string]: {
      isVisible: boolean;
      isExpanded: boolean;
    };
  };
};

interface VisibilityContextState {
  visbility: VisibilityObj;
  setVisibility: (
    sectionTitle: string,
    visibilityKey: 'isVisible' | 'isExpanded',
    visibilityValue: boolean
  ) => void;
  getVisibility: (
    sectionTitle: string
  ) => VisibilityObj[string][string] | undefined;
}

export const VisibilityContext = createContext<VisibilityContextState>({
  visbility: {},
  setVisibility: () => null,
  getVisibility: () => undefined,
});
