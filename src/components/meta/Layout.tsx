import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';

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
  padding-top: ${({ theme }) => theme.spacing[128]};
`;

const emptyArr: DropdowmMenuProps['menuItems'] = [];

export const Layout: React.FC<LayoutProps> = ({ children, title, meta }) => {
  const [docTitle, setDocTitle] = useState(title);
  const [navTitle, setNavTitle] = useState('');
  const [iconPortalNode, setIconPortalNode] = useState<HTMLDivElement>();
  const [dropdownItems, setDropdownItems] =
    useState<DropdowmMenuProps['menuItems']>(emptyArr);
  const isAtLeastXs = useBreakpointsAtLeast('xs');

  useEffect(() => {
    setDocTitle(title);
  }, [title]);

  const setIconPortalNodeCallback = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setIconPortalNode(node);
    }
  }, []);

  return (
    <NavContext.Provider
      value={{
        setNavTitle,
        iconPortalNode,
        setDropdownItems,
        setDocTitle,
      }}
    >
      <Head meta={meta} title={docTitle} />
      <NavBar
        dropdownMenuItems={dropdownItems}
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
