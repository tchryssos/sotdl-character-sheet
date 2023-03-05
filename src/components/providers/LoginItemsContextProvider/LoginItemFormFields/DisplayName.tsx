import { startCase } from 'lodash';

import { TextInput } from '~/components/form/TextInput';
import { LoginItem } from '~/typings/loginItems';

interface DisplayNameFieldsProps {
  item: LoginItem;
}

export function DisplayNameFields({ item }: DisplayNameFieldsProps) {
  return (
    <TextInput alwaysEditable label={startCase(item.type)} name={item.type} />
  );
}
