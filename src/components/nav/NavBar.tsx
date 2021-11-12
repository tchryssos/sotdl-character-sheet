import { useUser } from '@auth0/nextjs-auth0';
import styled from '@emotion/styled';

import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { Spacing } from '~/typings/theme';

import { AuthLink } from '../AuthLink';
// import { MutableRefObject, useContext, useState } from 'react';
import { FlexBox } from '../box/FlexBox';
import { LogIn } from '../icons/LogIn';
import { LogOut } from '../icons/LogOut';
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

const AuthenticationLink = styled(AuthLink)(({ theme }) => ({
  // Styles largely copied from IconButton
  height: theme.spacing[32],
  width: theme.spacing[32],
  ':hover': {
    backgroundColor: theme.colors.accentLight,
    filter: 'brightness(1.0)',
  },
}));

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
  const { user, isLoading, error } = useUser();

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
            {!user ? (
              <AuthenticationLink type="login">
                <LogIn title="Log In" titleId="login-signup" />
              </AuthenticationLink>
            ) : (
              <AuthenticationLink type="logout">
                <LogOut title="Log Out" titleId="log-out" />
              </AuthenticationLink>
            )}
          </FlexBox>
        </TopRow>
        <ExpandedPortal flexGap={flexGap} ref={setExpandedPortalNode} />
      </InnerToolbar>
    </Toolbar>
  );
};
