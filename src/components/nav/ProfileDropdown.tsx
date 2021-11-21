import styled from '@emotion/styled';
import { useState } from 'react';

import { MY_CHARACTERS_ROUTE } from '~/constants/routing';
import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { AuthLink } from '../AuthLink';
import { Divider } from '../Divider';
import { Link } from '../Link';
import { Pane } from '../Pane';
import { ProfilePicture } from '../ProfilePicture';
import { Body } from '../typography/Body';

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownPane = styled(Pane)<{ isHidden: boolean }>(
  ({ theme, isHidden }) => ({
    position: 'absolute',
    top: theme.spacing[40],
    right: 0,
    padding: 0,
    backgroundColor: theme.colors.background,
    ...(isHidden && {
      display: 'hidden',
      height: 0,
      width: 0,
      boxShadow: 'none',
      border: 'none',
      overflow: 'hidden',
    }),
  })
);

const DropdownAuthLink = styled(AuthLink)`
  width: 100%;
  text-align: right;
  box-sizing: border-box;
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[8]}`};
  :hover {
    filter: brightness(${({ theme }) => theme.filters.brightnessMod});
  }
`;

const DropdownLink = styled(Link)`
  width: 100%;
  text-align: right;
  box-sizing: border-box;
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[8]}`};
`;

interface ProfileDropdownProps {
  userImageSrc?: string;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  userImageSrc,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <DropdownWrapper>
      <ProfilePicture
        alt="Profile picture"
        imageSrc={userImageSrc}
        onClick={toggleOpen}
      />
      <DropdownPane isHidden={!isOpen}>
        <DropdownLink href={MY_CHARACTERS_ROUTE}>
          <Body>My characters</Body>
        </DropdownLink>
        <Divider color="accentLight" />
        <DropdownAuthLink type="logout">
          <Body>Logout</Body>
        </DropdownAuthLink>
      </DropdownPane>
    </DropdownWrapper>
  );
};
