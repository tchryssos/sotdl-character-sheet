import styled from '@emotion/styled';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Popper, { PopperProps } from '@mui/base/Popper';
import { MouseEventHandler, useState } from 'react';

import { FlexBox } from '../box/FlexBox';
import { TextButton } from '../buttons/TextButton';
import { Divider } from '../Divider';
import { Link } from '../Link';
import { Pane } from '../Pane';
import { Text } from '../Text';

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownPopper = styled(Popper)`
  z-index: 100;
`;

const DropdownPane = styled(Pane)(({ theme }) => ({
  padding: 0,
  backgroundColor: theme.colors.background,
  marginTop: theme.spacing['8'],
}));

const DropdownLink = styled(Link)`
  width: 100%;
  text-align: right;
  box-sizing: border-box;
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[8]}`};
`;

const ItemWrapper = styled(FlexBox)`
  width: 100%;
`;

const DropdownButton = styled(TextButton)`
  text-align: end;
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[8]}`};
`;

const DropdownLabel = styled(Text)`
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[8]}`};
  user-select: none;
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
    }
  | {
      type: 'label';
      text: string;
    };

export interface DropdownMenuProps {
  menuItems: MenuItemObj[];
  dropdownId: string;
  children: (props: {
    toggleOpen: MouseEventHandler;
    describedBy: string;
  }) => React.ReactNode;
  placement?: PopperProps['placement'];
}

interface MenuItemProps {
  item: MenuItemObj;
  setAnchorEl: (el: null) => void;
}
function MenuItem({ item, setAnchorEl }: MenuItemProps) {
  const onClick = () => setAnchorEl(null);
  switch (item.type) {
    case 'link':
      return (
        <DropdownLink href={item.href} onClick={onClick}>
          <Text variant="body">{item.text}</Text>
        </DropdownLink>
      );
    case 'button':
      return (
        <DropdownButton
          label={item.text}
          transparent
          onClick={() => {
            item.onClick();
            onClick();
          }}
        />
      );
    case 'label':
      return <DropdownLabel variant="body-sm">-- {item.text} --</DropdownLabel>;
    default:
      return <>{item.component}</>;
  }
}

export function DropdownMenu({
  menuItems,
  children,
  dropdownId,
  placement = 'bottom-start',
}: DropdownMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const toggleOpen: MouseEventHandler = (e) => {
    e.stopPropagation();
    setAnchorEl(anchorEl ? null : (e.currentTarget as HTMLElement));
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? dropdownId : undefined;

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <DropdownWrapper>
        {children({ toggleOpen, describedBy: dropdownId })}
        <DropdownPopper
          anchorEl={anchorEl}
          id={id}
          open={isOpen}
          placement={placement}
        >
          <DropdownPane shadowed>
            {menuItems.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <ItemWrapper flexDirection="column" key={`${item.type}-${i}`}>
                <MenuItem item={item} setAnchorEl={setAnchorEl} />
                {i !== menuItems.length - 1 && <Divider color="accentLight" />}
              </ItemWrapper>
            ))}
          </DropdownPane>
        </DropdownPopper>
      </DropdownWrapper>
    </ClickAwayListener>
  );
}
