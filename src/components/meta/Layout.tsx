import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

import { NavContext } from '~/logic/contexts/navContext';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';

import { FlexBox } from '../box/FlexBox';
import { DropdowmMenuProps } from '../dropdowns/DropdownMenu';
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
  padding-top: ${({ theme }) => theme.spacing[96]};
`;

const emptyArr: DropdowmMenuProps['menuItems'] = [];

export const Layout: React.FC<LayoutProps> = ({ children, title, meta }) => {
  const [navTitle, setNavTitle] = useState('');
  const [iconPortalNode, setIconPortalNode] = useState<HTMLDivElement>();
  const [expandedPortalNode, setExpandedPortalNode] =
    useState<HTMLDivElement>();
  const [dropdownItems, setDropdownItems] =
    useState<DropdowmMenuProps['menuItems']>(emptyArr);
  const [navExpanded, setNavExpanded] = useState(false);
  const isAtLeastXs = useBreakpointsAtLeast('xs');

  const setIconPortalNodeCallback = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setIconPortalNode(node);
    }
  }, []);

  const setExpandedPortalNodeCallback = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setExpandedPortalNode(node);
    }
  }, []);

  return (
    <NavContext.Provider
      value={{
        setNavTitle,
        setNavExpanded,
        iconPortalNode,
        expandedPortalNode,
        isNavExpanded: navExpanded,
        setDropdownItems,
      }}
    >
      <Head meta={meta} title={title} />
      <NavBar
        dropdownMenuItems={dropdownItems}
        isExpanded={navExpanded}
        setExpandedPortalNode={setExpandedPortalNodeCallback}
        setIconPortalNode={setIconPortalNodeCallback}
        title={navTitle}
      />
      <FlexBox
        flex={1}
        justifyContent="center"
        pb={8}
        px={isAtLeastXs ? 32 : 16}
      >
        <PageWrapper alignItems="center" column>
          {children}
        </PageWrapper>
      </FlexBox>
    </NavContext.Provider>
  );
};
