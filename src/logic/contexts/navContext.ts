import { createContext } from 'react';

import { DropdowmMenuProps } from '~/components/dropdowns/DropdownMenu';

type NavContext = {
  iconPortalNode: HTMLDivElement | undefined;
  expandedPortalNode: HTMLDivElement | undefined;
  setNavExpanded: (isExpanded: boolean) => void;
  setNavTitle: (title: string) => void;
  setDocTitle: (title: string) => void;
  setDropdownItems: (items: DropdowmMenuProps['menuItems']) => void;
  isNavExpanded: boolean;
};

export const NavContext = createContext<NavContext>({
  iconPortalNode: undefined,
  expandedPortalNode: undefined,
  setNavExpanded: () => null,
  setNavTitle: () => null,
  setDocTitle: () => null,
  isNavExpanded: false,
  setDropdownItems: () => null,
});
