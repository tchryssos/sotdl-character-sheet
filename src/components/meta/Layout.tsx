import { useCallback, useEffect, useMemo, useState } from 'react';

import { NavContext } from '~/logic/contexts/navContext';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';
import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { DropdownMenuProps } from '../dropdowns/DropdownMenu';
import { NavBar } from '../nav/NavBar';
import { BodyContainer } from './BodyContainer';
import { Head } from './Head';

type LayoutProps = {
  children?: React.ReactNode;
  title: string;
  meta: string;
};

const emptyArr: DropdownMenuProps['menuItems'] = [];

export function Layout({ children, title, meta }: LayoutProps) {
  const [docTitle, setDocTitle] = useState(title);
  const [navTitle, setNavTitle] = useState('');
  const [iconPortalNode, setIconPortalNode] = useState<HTMLDivElement>();
  const [headerPortalNode, setHeaderPortalNode] = useState<HTMLDivElement>();
  const [dropdownItems, setDropdownItems] =
    useState<DropdownMenuProps['menuItems']>(emptyArr);
  const isAtLeastXs = useBreakpointsAtLeast('xs');

  useEffect(() => {
    setDocTitle(title);
  }, [title]);

  const setIconPortalNodeCallback = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setIconPortalNode(node);
    }
  }, []);

  const setHeaderPortalNodeCallback = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setHeaderPortalNode(node);
    }
  }, []);

  const layoutContextValue = useMemo(
    () => ({
      setNavTitle,
      iconPortalNode,
      headerPortalNode,
      setDropdownItems,
      setDocTitle,
    }),
    [iconPortalNode, headerPortalNode]
  );

  return (
    <NavContext.Provider value={layoutContextValue}>
      <Head meta={meta} title={docTitle} />
      <NavBar
        dropdownMenuItems={dropdownItems}
        iconPortalNode={iconPortalNode}
        setHeaderPortalNode={setHeaderPortalNodeCallback}
        setIconPortalNode={setIconPortalNodeCallback}
        title={navTitle}
      />
      <BodyContainer
        paddingBottom={8}
        paddingTop={isAtLeastXs ? pxToRem(140) : pxToRem(120)}
      >
        {children}
      </BodyContainer>
    </NavContext.Provider>
  );
}
