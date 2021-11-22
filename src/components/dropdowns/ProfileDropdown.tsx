import styled from '@emotion/styled';

import { MY_CHARACTERS_ROUTE } from '~/constants/routing';

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

const menuItems: DropdowmMenuProps['menuItems'] = [
  {
    type: 'link',
    href: MY_CHARACTERS_ROUTE,
    text: 'My characters',
  },
  {
    type: 'special',
    component: (
      <DropdownAuthLink type="logout">
        <Body>Logout</Body>
      </DropdownAuthLink>
    ),
  },
];

interface ProfileDropdownProps {
  userImageSrc?: string;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  userImageSrc,
}) => (
  <DropdownMenu menuItems={menuItems}>
    {({ toggleOpen }) => (
      <ProfilePicture
        alt="Profile picture"
        imageSrc={userImageSrc}
        onClick={toggleOpen}
      />
    )}
  </DropdownMenu>
);
