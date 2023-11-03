import { SelectInput } from '~/components/form/SelectInput';
import { SelectOption } from '~/components/form/typings';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

import { createWeaponFieldName } from './utils';

const weaponGripOptions: SelectOption[] = [
  {
    label: 'One',
    value: '1',
  },
  {
    label: 'Two',
    value: '2',
  },
  {
    label: 'Off',
    value: '0',
  },
];

interface GripInputProps {
  index: number;
}

export function GripInput({ index }: GripInputProps) {
  return (
    <SelectInput<SotwwCharacterData>
      label="Grip"
      name={createWeaponFieldName('weapon_grip', index)}
      options={weaponGripOptions}
    />
  );
}
