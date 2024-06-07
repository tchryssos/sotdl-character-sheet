import { useUser } from '@auth0/nextjs-auth0';
import styled from '@emotion/styled';
import { useMemo } from 'react';

import { ADMIN_PANEL_ROUTE, SETTINGS_ROUTE } from '~/constants/routing/client';
import { createUsersRoute } from '~/constants/routing/shared';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { getNameFromUser } from '~/logic/utils/user';
import { StrictSessionUser } from '~/typings/user';

import { AuthLink } from '../AuthLink';
import { IconButton } from '../buttons/IconButton';
import { Hamburger } from '../icons/Hamburger';
import { Text } from '../Text';
import { DropdownMenu, MenuItemObj } from './DropdownMenu';

const DropdownAuthLink = styled(AuthLink)`
  width: 100%;
  text-align: right;
  box-sizing: border-box;
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[8]}`};
  :hover {
    filter: brightness(${({ theme }) => theme.filters.brightnessMod});
  }
`;

const createMenuItems = (
  user: StrictSessionUser | undefined,
  isLoading: boolean,
  isXxs: boolean
): MenuItemObj[] => {
  let items: MenuItemObj[] = [];

  if (!isLoading) {
    if (user?.id) {
      items = [
        {
          type: 'link',
          href: createUsersRoute(user.id),
          text: 'My characters',
        },
        ...(user.role === 'admin'
          ? ([
              {
                type: 'link',
                href: ADMIN_PANEL_ROUTE,
                text: 'Admin panel',
              },
            ] as MenuItemObj[])
          : ([] as MenuItemObj[])),
        ...items,
        {
          type: 'link',
          href: SETTINGS_ROUTE,
          text: 'Settings',
        },
        {
          type: 'special',
          component: (
            <DropdownAuthLink type="logout">
              <Text variant="body">Log out</Text>
            </DropdownAuthLink>
          ),
        },
      ];
    } else {
      items = [
        ...items,
        {
          type: 'special',
          component: (
            <DropdownAuthLink type="login">
              <Text variant="body">Authenticate</Text>
            </DropdownAuthLink>
          ),
        },
      ];
    }
  }

  const name = getNameFromUser(user);

  if (isXxs && name) {
    items = [{ type: 'label', text: name }, ...items];
  }

  return items;
};

interface ProfileDropdownProps {
  dropdownMenuItems: MenuItemObj[];
}

export function ProfileDropdown({ dropdownMenuItems }: ProfileDropdownProps) {
  const { isLoading, user } = useUser();
  const isXxs = useBreakpointsLessThan('xs');

  const menuItems = useMemo(
    () => [
      ...dropdownMenuItems,
      ...createMenuItems(user as StrictSessionUser, isLoading, isXxs),
    ],
    [dropdownMenuItems, user, isLoading, isXxs]
  );

  return (
    <DropdownMenu dropdownId="profile-menu" menuItems={menuItems}>
      {({ toggleOpen, describedBy }) => (
        <IconButton aria-describedby={describedBy} onClick={toggleOpen}>
          <Hamburger title="Menu" titleId="menu" />
        </IconButton>
      )}
    </DropdownMenu>
  );
}
