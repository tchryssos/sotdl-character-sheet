import { useUser } from '@auth0/nextjs-auth0';
import styled from '@emotion/styled';

import { createProfileRoute, SETTINGS_ROUTE } from '~/constants/routing';

import { AuthLink } from '../AuthLink';
import { ProfilePicture } from '../ProfilePicture';
import { Body } from '../typography/Body';
import { DropdowmMenuProps, DropdownMenu } from './DropdownMenu';

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
  userId: number | undefined,
  isLoading: boolean
): DropdowmMenuProps['menuItems'] => {
  const sharedItems: DropdowmMenuProps['menuItems'] = [
    {
      type: 'link',
      href: SETTINGS_ROUTE,
      text: 'Settings',
    },
  ];

  if (isLoading) {
    return sharedItems;
  }

  if (userId) {
    return [
      {
        type: 'link',
        href: createProfileRoute(userId),
        text: 'My characters',
      },
      ...sharedItems,
      {
        type: 'special',
        component: (
          <DropdownAuthLink type="logout">
            <Body>Log out</Body>
          </DropdownAuthLink>
        ),
      },
    ];
  }

  return [
    ...sharedItems,
    {
      type: 'special',
      component: (
        <DropdownAuthLink type="login">
          <Body>Authenticate</Body>
        </DropdownAuthLink>
      ),
    },
  ];
};

export const ProfileDropdown: React.FC = () => {
  const { isLoading, user } = useUser();
  return (
    <DropdownMenu menuItems={createMenuItems(user?.id, isLoading)}>
      {({ toggleOpen }) => (
        <ProfilePicture
          alt="Profile picture"
          imageSrc={user?.authProviderData.picture}
          onClick={toggleOpen}
        />
      )}
    </DropdownMenu>
  );
};
