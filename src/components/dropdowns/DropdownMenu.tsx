import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';

import { FlexBox } from '../box/FlexBox';
import { Divider } from '../Divider';
import { Link } from '../Link';
import { Pane } from '../Pane';
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

const DropdownLink = styled(Link)`
  width: 100%;
  text-align: right;
  box-sizing: border-box;
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[8]}`};
`;

const ItemWrapper = styled(FlexBox)`
  width: 100%;
`;

type MenuItemObj =
  | {
      type: 'link';
      href: string;
      text: string;
    }
  | {
      type: 'special';
      component: React.ReactNode;
    }
  | {
      type: 'button';
      text: string;
      onClick: () => void;
    };

export interface DropdowmMenuProps {
  menuItems: MenuItemObj[];
  children: (props: { toggleOpen: () => void }) => React.ReactNode;
}

interface MenuItemProps {
  item: MenuItemObj;
}
const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  switch (item.type) {
    case 'link':
      return (
        <DropdownLink href={item.href}>
          <Body>{item.text}</Body>
        </DropdownLink>
      );
    case 'button':
      return null;
    default:
      return <>{item.component}</>;
  }
};

export const DropdownMenu: React.FC<DropdowmMenuProps> = ({
  menuItems,
  children,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const setClosed = () => setIsOpen(false);

  const onClickOutsideDropdown: EventListener = useCallback((e) => {
    if (!dropdownRef.current?.contains(e.target as Node)) {
      setClosed();
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', setClosed);
    } else {
      window.removeEventListener('click', setClosed);
    }
  }, [isOpen, onClickOutsideDropdown]);

  return (
    <DropdownWrapper ref={dropdownRef}>
      {children({ toggleOpen })}
      <DropdownPane isHidden={!isOpen} shadowed>
        {menuItems.map((item, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <ItemWrapper column key={`${item.type}-${i}`}>
            <MenuItem item={item} />
            {i !== menuItems.length - 1 && <Divider color="accentLight" />}
          </ItemWrapper>
        ))}
      </DropdownPane>
    </DropdownWrapper>
  );
};
