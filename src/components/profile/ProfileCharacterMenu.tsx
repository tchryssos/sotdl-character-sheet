import { IconButton } from '../buttons/IconButton';
import { DropdownMenu } from '../dropdowns/DropdownMenu';
import { Kebab } from '../icons/Kebab';

interface ProfileCharacterMenuProps {
  name: string;
  id: string | number;
}

export function ProfileCharacterMenu({ name, id }: ProfileCharacterMenuProps) {
  return (
    <DropdownMenu dropdownId={`${name}-${id}-menu`} menuItems={[]}>
      {({ toggleOpen, describedBy }) => (
        <IconButton aria-describedby={describedBy} onClick={toggleOpen}>
          <Kebab title="Character menu" titleId="character-menu" />
        </IconButton>
      )}
    </DropdownMenu>
  );
}
