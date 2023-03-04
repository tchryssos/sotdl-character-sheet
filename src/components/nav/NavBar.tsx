import { useUser } from '@auth0/nextjs-auth0';
import styled from '@emotion/styled';

import { HOME_ROUTE } from '~/constants/routing/client';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { getIconFromUser, getNameFromUser } from '~/logic/user';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
import { Spacing } from '~/typings/theme';
import { StrictSessionUser } from '~/typings/user';

import { LogoAscii } from '../ascii/LogoAscii';
import { Box } from '../box/Box';
import { FlexBox } from '../box/FlexBox';
import { DropdownMenuProps } from '../dropdowns/DropdownMenu';
import { ProfileDropdown } from '../dropdowns/ProfileDropdown';
import { RpgIcon } from '../icons/RpgIcon';
import { Link } from '../Link';
import { Text } from '../Text';

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

interface NavBarProps {
  title: string;
  setIconPortalNode: (node: HTMLDivElement) => void;
  dropdownMenuItems: DropdownMenuProps['menuItems'];
  hasPortalContent: boolean;
}

export function NavBar({
  title,
  setIconPortalNode,
  dropdownMenuItems,
  hasPortalContent,
}: NavBarProps) {
  const isXxs = useBreakpointsLessThan('xs');
  const flexGap = isXxs ? 8 : 16;
  const { user } = useUser();
  const userName = getNameFromUser(user as StrictSessionUser);

  return (
    <Toolbar center flex={1}>
      <InnerToolbar alignItems="flex-end" flex={1} flexDirection="column">
        <TopRow alignItems="center" justifyContent="space-between">
          <LogoTitleBox alignItems="center" gap={flexGap}>
            <HomeLink href={HOME_ROUTE}>
              <Logo size={isXxs ? 'xs' : 'sm'} />
            </HomeLink>
            {title && (
              <Title as="h2" variant={isXxs ? 'body-sm' : 'body'}>
                {title}
              </Title>
            )}
          </LogoTitleBox>
          <FlexBox alignItems="center" gap={flexGap}>
            <Portal flexGap={flexGap} ref={setIconPortalNode} />
            {userName && !hasPortalContent && !isXxs && (
              <FlexBox alignItems="center" gap={8}>
                <Box height={pxToRem(18)} width={pxToRem(18)}>
                  <RpgIcon
                    iconIndex={getIconFromUser(user as StrictSessionUser)}
                  />
                </Box>
                <Text as="p">{userName}</Text>
              </FlexBox>
            )}
            <ProfileDropdown dropdownMenuItems={dropdownMenuItems} />
          </FlexBox>
        </TopRow>
      </InnerToolbar>
    </Toolbar>
  );
}
