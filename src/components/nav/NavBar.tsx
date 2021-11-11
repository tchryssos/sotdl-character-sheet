import styled from '@emotion/styled';
import { MutableRefObject, useState } from 'react';

import { FlexBox } from '../box/FlexBox';
import { Link } from '../Link';
import { LogoAscii } from '../LogoAscii';
import { Body } from '../typography/Body';
import { ColorModeToggle } from './ColorModeToggle';

const Toolbar = styled(FlexBox)<{ isExpanded: boolean }>(({ theme }) => ({
  position: 'fixed',
  backgroundColor: theme.colors.background,
  top: 0,
  left: 0,
  width: '100%',
  padding: theme.spacing[16],
  borderBottom: `${theme.border.borderWidth[1]} solid ${theme.colors.text}`,
  boxShadow: `${theme.colors.smudge} 0 ${theme.spacing[4]}`,
  [theme.breakpoints.sm]: {
    padding: `${theme.spacing[16]} ${theme.spacing[32]}`,
  },
  zIndex: 100,
}));

const InnerToolbar = styled(FlexBox)(({ theme }) => ({
  maxWidth: theme.breakpointValues.lg,
}));

const TopRow = styled(FlexBox)`
  width: 100%;
`;

const HomeLink = styled(Link)`
  text-decoration: none;
`;

interface NavBarProps {
  title: string;
  isExpanded: boolean;
  portalRef: MutableRefObject<HTMLDivElement | null>;
}

export const NavBar: React.FC<NavBarProps> = ({
  title,
  isExpanded,
  portalRef,
}) => (
  <Toolbar center flex={1} isExpanded={isExpanded}>
    <InnerToolbar alignItems="flex-end" column flex={1}>
      <TopRow alignItems="center" justifyContent="space-between">
        <FlexBox>
          <HomeLink href="/" isInternal>
            <LogoAscii size="sm" />
          </HomeLink>
          {title && <Body>{title}</Body>}
        </FlexBox>
        <FlexBox>
          <div ref={portalRef} />
          <ColorModeToggle />
        </FlexBox>
      </TopRow>
    </InnerToolbar>
  </Toolbar>
);
