import { createContext, MutableRefObject } from 'react';

type NavContext = {
  portalRef: MutableRefObject<HTMLDivElement | null>;
  setNavExpanded: (isExpanded: boolean) => void;
  setNavTitle: (title: string) => void;
};

export const NavContext = createContext<NavContext>({
  portalRef: {} as MutableRefObject<HTMLDivElement>,
  setNavExpanded: () => null,
  setNavTitle: () => null,
});
