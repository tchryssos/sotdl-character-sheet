import { LoginItemTypes } from '~/constants/loginItems';
import { LoginItem } from '~/typings/loginItems';

import { DisplayNameFields } from './displayName';
import { ImageUrl } from './ImageUrl';

interface FormFieldSwitchProps {
  item: LoginItem;
}

export function FormFieldSwitch({ item }: FormFieldSwitchProps) {
  switch (item.type) {
    case LoginItemTypes.DisplayName:
      return <DisplayNameFields item={item} />;
    case LoginItemTypes.ImageUrl:
      return <ImageUrl item={item} />;
    default:
      console.error('NO FIELDS FOR THIS ITEM TYPE. RPG DEV GO FIX THIS');
      return null;
  }
}
