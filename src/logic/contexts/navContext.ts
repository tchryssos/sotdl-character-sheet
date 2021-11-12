import { createContext } from 'react';

type NavContext = {
  portalNode: HTMLDivElement | undefined;
  setNavExpanded: (isExpanded: boolean) => void;
  setNavTitle: (title: string) => void;
  isNavExpanded: boolean;
};

export const NavContext = createContext<NavContext>({
  portalNode: undefined,
  setNavExpanded: () => null,
  setNavTitle: () => null,
  isNavExpanded: false,
});
