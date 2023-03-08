import { IconImageUrlInput } from '~/components/form/IconImageUrlInput';
import { LoginItemTypes } from '~/constants/loginItems';
import { LoginItem } from '~/typings/loginItems';

import { DisplayNameFields } from './DisplayName';

interface FormFieldSwitchProps {
  item: LoginItem;
}

export function FormFieldSwitch({ item }: FormFieldSwitchProps) {
  switch (item.type) {
    case LoginItemTypes.DisplayName:
      return <DisplayNameFields item={item} />;
    case LoginItemTypes.ImageUrl:
      return <IconImageUrlInput name={item.type} />;
    default:
      console.error('NO FIELDS FOR THIS ITEM TYPE. RPG DEV GO FIX THIS');
      return null;
  }
}
