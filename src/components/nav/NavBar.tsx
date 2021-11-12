import styled from '@emotion/styled';

import {
  useBreakpointsIsExactly,
  useBreakpointsLessThan,
} from '~/logic/hooks/useBreakpoints';
import { Spacing } from '~/typings/theme';
// import { MutableRefObject, useContext, useState } from 'react';
// import { AuthContext } from '~/logic/contexts/authContext';
import { pxToRem } from '~/utils/styles';

import { FlexBox } from '../box/FlexBox';
// import { IconButton } from '../buttons/IconButton';
// import { TextButton } from '../buttons/TextButton';
// import { LogIn } from '../icons/LogIn';
// import { LogOut } from '../icons/LogOut';
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
  borderBottom: `${theme.border.borderWidth[1]} solid ${theme.colors.accentHeavy}`,
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

const LogoTitleBox = styled(FlexBox)`
  overflow: hidden;
`;

const HomeLink = styled(Link)`
  text-decoration: none;
`;

const Logo = styled(LogoAscii)(({ theme }) => ({
  marginBottom: theme.spacing[8],
  [theme.breakpoints.xs]: {
    marginBottom: 0,
  },
}));

const Title = styled(Body)`
  -webkit-line-clamp: 2;
  display: -webkit-inline-box;
  -webkit-box-orient: vertical;
`;

const Portal = styled.div<{ flexGap: Spacing }>`
  display: flex;
  align-items: center;
  gap: ${({ theme, flexGap }) => theme.spacing[flexGap]};
`;

const ExpandedPortal = styled(Portal)`
  width: 100%;
`;

interface NavBarProps {
  title: string;
  isExpanded: boolean;
  setIconPortalNode: (node: HTMLDivElement) => void;
  setExpandedPortalNode: (node: HTMLDivElement) => void;
}

export const NavBar: React.FC<NavBarProps> = ({
  title,
  isExpanded,
  setIconPortalNode,
  setExpandedPortalNode,
}) => {
  const isXxs = useBreakpointsLessThan('xs');
  const flexGap = isXxs ? 8 : 16;
  return (
    <Toolbar center flex={1} isExpanded={isExpanded}>
      <InnerToolbar alignItems="flex-end" column flex={1}>
        <TopRow alignItems="center" justifyContent="space-between">
          <LogoTitleBox alignItems="center" gap={flexGap}>
            <HomeLink href="/" isInternal>
              <Logo size={isXxs ? 'xs' : 'sm'} />
            </HomeLink>
            {title && <Title variant="decorative">{title}</Title>}
          </LogoTitleBox>
          <FlexBox alignItems="center" gap={flexGap}>
            <Portal flexGap={flexGap} ref={setIconPortalNode} />
            <ColorModeToggle />
            {/* {!user.isAuthenticated ? (
                <IconButton>
                  <LogIn title="Log In / Sign Up" titleId="login-signup" />
                </IconButton>
              ) : (
                <IconButton>
                  <LogOut title="Log Out" titleId="log-out" />
                </IconButton>
              )} */}
          </FlexBox>
        </TopRow>
        <ExpandedPortal flexGap={flexGap} ref={setExpandedPortalNode} />
      </InnerToolbar>
    </Toolbar>
  );
};
