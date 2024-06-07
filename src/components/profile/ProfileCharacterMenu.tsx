import { FlexBox } from '../box/FlexBox';
import { TextButton, TextButtonProps } from '../buttons/TextButton';
import { Divider } from '../Divider';

interface ProfileCharacterMenuProps {
  name: string;
  id: string | number;
  menuItems: TextButtonProps[];
}

export function ProfileCharacterMenu({
  // name,
  // id,
  menuItems,
}: ProfileCharacterMenuProps) {
  if (!menuItems.length) return null;

  return (
    <>
      <Divider color="smudge" />
      <FlexBox gap={8} justifyContent="flex-end">
        {menuItems.map(({ label, ...rest }, i) => (
          <TextButton key={label} label={label} variant="body-xs" {...rest} />
        ))}
      </FlexBox>
    </>
  );
}
