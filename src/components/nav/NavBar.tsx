import { useUser } from '@auth0/nextjs-auth0';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { HOME_ROUTE } from '~/constants/routing/client';
import { createUsersRoute } from '~/constants/routing/shared';
import {
  useBreakpointsAtLeast,
  useBreakpointsLessThan,
} from '~/logic/hooks/useBreakpoints';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
import { getIconFromUser, getNameFromUser } from '~/logic/utils/user';
import { Spacing } from '~/typings/theme';
import { StrictSessionUser } from '~/typings/user';

import { LogoAscii } from '../ascii/LogoAscii';
import { Box } from '../box/Box';
import { FlexBox } from '../box/FlexBox';
import { GridBox } from '../box/GridBox';
import { DropdownMenuProps } from '../dropdowns/DropdownMenu';
import { ProfileDropdown } from '../dropdowns/ProfileDropdown';
import { RpgIcon } from '../icons/RpgIcon';
import { Link } from '../Link';
import { Text } from '../Text';
import { NavProgress } from './NavProgress';

const Toolbar = styled(FlexBox)(({ theme }) => ({
  position: 'fixed',
  backgroundColor: theme.colors.background,
  top: 0,
  left: 0,
  width: '100%',
  padding: theme.spacing[16],
  borderBottom: `${theme.borderWidth[1]} solid ${theme.colors.accentHeavy}`,
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

const Title = styled(Text)`
  -webkit-line-clamp: 2;
  display: -webkit-inline-box;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;

const Portal = styled.div<{ flexGap: Spacing }>`
  display: flex;
  align-items: center;
  gap: ${({ theme, flexGap }) => theme.spacing[flexGap]};
`;

const UserName = styled(Text)`
  white-space: nowrap;
`;
interface NavBarProps {
  title: string;
  setIconPortalNode: (node: HTMLDivElement) => void;
  setHeaderPortalNode: (node: HTMLDivElement) => void;
  dropdownMenuItems: DropdownMenuProps['menuItems'];
  iconPortalNode?: HTMLDivElement;
}

export function NavBar({
  title,
  setIconPortalNode,
  setHeaderPortalNode,
  dropdownMenuItems,
  iconPortalNode,
}: NavBarProps) {
  const isXxs = useBreakpointsLessThan('xs');
  const flexGap = isXxs ? 8 : 16;
  const { user } = useUser();
  const userName = getNameFromUser(user as StrictSessionUser);
  const atLeastMd = useBreakpointsAtLeast('md');
  const theme = useTheme();

  // iconPortalNode is indeed the div below, but I was having issues with props
  // not updating when I tried to pass values FROM the node vs the node itself
  // so now we're calculating this in NavBar instead of Layout
  const hasPortalChildren = Boolean(iconPortalNode?.childElementCount);

  return (
    <Toolbar center flex={1} flexDirection="column">
      <NavProgress />
      <InnerToolbar
        alignItems="flex-end"
        flex={1}
        flexDirection="column"
        width="100%"
      >
        <TopRow alignItems="center" justifyContent="space-between">
          <LogoTitleBox alignItems="center" gap={flexGap}>
            <HomeLink href={HOME_ROUTE}>
              <Logo size={isXxs ? 'xs' : 'sm'} />
            </HomeLink>
            <Portal flexGap={flexGap} ref={setHeaderPortalNode} />
            {title && (
              <Title as="h2" variant={isXxs ? 'body-sm' : 'body'}>
                {title}
              </Title>
            )}
          </LogoTitleBox>
          <FlexBox alignItems="center" gap={flexGap}>
            {userName && atLeastMd && (
              <Link
                href={createUsersRoute((user as StrictSessionUser).id)}
                isInternal
              >
                <GridBox
                  alignItems="center"
                  gap={8}
                  gridTemplateColumns="auto 1fr"
                  maxWidth={pxToRem(200)}
                >
                  <Box height={pxToRem(18)} width={pxToRem(18)}>
                    <RpgIcon
                      iconIndex={getIconFromUser(user as StrictSessionUser)}
                    />
                  </Box>
                  <UserName as="p" overflow="hidden" textOverflow="ellipsis">
                    {userName}
                  </UserName>
                </GridBox>
              </Link>
            )}
            <ProfileDropdown dropdownMenuItems={dropdownMenuItems} />
          </FlexBox>
        </TopRow>
      </InnerToolbar>

      <FlexBox
        marginTop={hasPortalChildren ? 4 : 0}
        maxWidth={`${theme.breakpointValues.lg}px`}
        width="100%"
      >
        <FlexBox flex={1} justifyContent="flex-end" width="100%">
          <Portal flexGap={flexGap} ref={setIconPortalNode} />
        </FlexBox>
      </FlexBox>
    </Toolbar>
  );
}
