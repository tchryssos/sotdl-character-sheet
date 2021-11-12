import { createContext } from 'react';

type NavContext = {
  iconPortalNode: HTMLDivElement | undefined;
  expandedPortalNode: HTMLDivElement | undefined;
  setNavExpanded: (isExpanded: boolean) => void;
  setNavTitle: (title: string) => void;
  isNavExpanded: boolean;
};

export const NavContext = createContext<NavContext>({
  iconPortalNode: undefined,
  expandedPortalNode: undefined,
  setNavExpanded: () => null,
  setNavTitle: () => null,
  isNavExpanded: false,
});
