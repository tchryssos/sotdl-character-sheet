import { useUser } from '@auth0/nextjs-auth0';
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
import { Divider } from '../divider/Divider';
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

const VertDivider = styled(Divider)`
  align-self: stretch;
  height: unset;
`;

interface NavBarProps {
  title: string;
  setIconPortalNode: (node: HTMLDivElement) => void;
  setHeaderPortalNode: (node: HTMLDivElement) => void;
  dropdownMenuItems: DropdownMenuProps['menuItems'];
}

export function NavBar({
  title,
  setIconPortalNode,
  setHeaderPortalNode,
  dropdownMenuItems,
}: NavBarProps) {
  const isXxs = useBreakpointsLessThan('xs');
  const atLeastMd = useBreakpointsAtLeast('md');
  const flexGap = isXxs ? 8 : 16;
  const { user } = useUser();
  const userName = getNameFromUser(user as StrictSessionUser);

  return (
    <Toolbar center flex={1}>
      <NavProgress />
      <InnerToolbar alignItems="flex-end" flex={1} flexDirection="column">
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
            <Portal flexGap={flexGap} ref={setIconPortalNode} />
            {userName && atLeastMd && (
              <>
                <VertDivider color="accentLight" vertical />
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
              </>
            )}
            <ProfileDropdown dropdownMenuItems={dropdownMenuItems} />
          </FlexBox>
        </TopRow>
      </InnerToolbar>
    </Toolbar>
  );
}
