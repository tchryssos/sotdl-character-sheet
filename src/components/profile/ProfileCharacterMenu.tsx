import { Box } from '../box/Box';
import { FlexBox } from '../box/FlexBox';
import { TextButton } from '../buttons/TextButton';
import { Divider } from '../Divider';
import { ButtonMenuItem } from '../dropdowns/DropdownMenu';

interface ProfileCharacterMenuProps {
  name: string;
  id: string | number;
  menuItems: ButtonMenuItem[];
}

export function ProfileCharacterMenu({
  name,
  id,
  menuItems,
}: ProfileCharacterMenuProps) {
  if (!menuItems.length) return null;

  // return (
  //   <DropdownMenu dropdownId={`${name}-${id}-menu`} menuItems={menuItems}>
  //     {({ toggleOpen, describedBy }) => (
  //       <IconButton aria-describedby={describedBy} onClick={toggleOpen}>
  //         <Kebab title="Character menu" titleId="character-menu" />
  //       </IconButton>
  //     )}
  //   </DropdownMenu>
  // );
  return (
    <>
      <Divider color="accentLight" />
      <FlexBox gap={8} justifyContent="flex-end">
        {menuItems.map((item, i) => (
          <TextButton
            key={item.text}
            label={item.text}
            variant="body-xs"
            onClick={item.onClick}
          />
        ))}
      </FlexBox>
    </>
  );
}
