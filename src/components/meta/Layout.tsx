import styled from '@emotion/styled';
import { useCallback, useRef, useState } from 'react';

import { NavContext } from '~/logic/contexts/navContext';

import { FlexBox } from '../box/FlexBox';
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

export const Layout: React.FC<LayoutProps> = ({ children, title, meta }) => {
  const [navTitle, setNavTitle] = useState('');
  const [portalNode, setPortalNode] = useState<HTMLDivElement>();

  const [navExpanded, setNavExpanded] = useState(false);
  const setPortalNodeCallback = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setPortalNode(node);
    }
  }, []);

  return (
    <NavContext.Provider
      value={{
        setNavTitle,
        setNavExpanded,
        portalNode,
        isNavExpanded: navExpanded,
      }}
    >
      <Head meta={meta} title={title} />
      <NavBar
        isExpanded={navExpanded}
        setPortalNode={setPortalNodeCallback}
        title={navTitle}
      />
      <FlexBox flex={1} justifyContent="center" pb={8} px={16}>
        <PageWrapper alignItems="center" column>
          {children}
        </PageWrapper>
      </FlexBox>
    </NavContext.Provider>
  );
};
