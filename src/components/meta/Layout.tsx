import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { NavContext } from '~/logic/contexts/navContext';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';
import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { FlexBox } from '../box/FlexBox';
import { DropdownMenuProps } from '../dropdowns/DropdownMenu';
import { NavBar } from '../nav/NavBar';
import { Head } from './Head';

type LayoutProps = {
  children?: React.ReactNode;
  title: string;
  meta: string;
};

const PageWrapper = styled(FlexBox)`
  max-width: ${({ theme }) => theme.breakpointValues.lg}px;
  width: 100%;
  height: 100%;
  padding-top: ${pxToRem(120)};
  ${({ theme }) => theme.breakpoints.xs} {
    padding-top: ${pxToRem(140)};
  }
`;

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

  const hasPortalChildren = Boolean(iconPortalNode?.childElementCount);

  return (
    <NavContext.Provider value={layoutContextValue}>
      <Head meta={meta} title={docTitle} />
      <NavBar
        dropdownMenuItems={dropdownItems}
        hasPortalChildren={hasPortalChildren}
        setHeaderPortalNode={setHeaderPortalNodeCallback}
        setIconPortalNode={setIconPortalNodeCallback}
        title={navTitle}
      />
      <FlexBox
        flex={1}
        justifyContent="center"
        paddingBottom={8}
        paddingX={isAtLeastXs ? 32 : 16}
      >
        <PageWrapper alignItems="center" flexDirection="column">
          {children}
        </PageWrapper>
      </FlexBox>
    </NavContext.Provider>
  );
}
