import styled from '@emotion/styled';
import { useRef, useState } from 'react';

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
`;

export const Layout: React.FC<LayoutProps> = ({ children, title, meta }) => {
  const [navTitle, setNavTitle] = useState('');
  const [navExpanded, setNavExpanded] = useState(false);
  const navPortalRef = useRef<HTMLDivElement>(null);

  return (
    <NavContext.Provider
      value={{ setNavTitle, setNavExpanded, portalRef: navPortalRef }}
    >
      <Head meta={meta} title={title} />
      <NavBar
        isExpanded={navExpanded}
        portalRef={navPortalRef}
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
