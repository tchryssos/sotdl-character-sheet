import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { SelectInput } from '~/components/form/SelectInput';
import { KeyName, SelectOption } from '~/components/form/typings';
import { CwnCharacterData } from '~/typings/cwn/characterData';

import {
  findParentArmorAccessories,
  removeAccessoryFromParentArmor,
} from './utils';

interface EquippedToInputProps {
  equippedToFieldName: KeyName<CwnCharacterData>;
  accessoryArmorId: string;
}

type EquippedToFieldName = `armors.${number}.equippedTo`;

export function EquippedToInput({
  equippedToFieldName,
  accessoryArmorId,
}: EquippedToInputProps) {
  const { watch, setValue, getValues } = useFormContext<CwnCharacterData>();

  const armors = watch('armors');
  const equippedTo = watch(equippedToFieldName as EquippedToFieldName);

  const armorOptions: SelectOption[] = armors.flatMap((armor) => {
    if (armor.weight === 'accessory' || armor.weight === 'shield') {
      return [];
    }
    return [
      {
        label: armor.name,
        value: armor.id,
      },
    ];
  });

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // First, remove this accessory from the previous parent armor
    removeAccessoryFromParentArmor(accessoryArmorId, equippedTo, {
      setValue,
      getValues,
    });

    // Next, set the equippedTo value to the new parent armor
    const parentArmorId = e.target.value;
    setValue(equippedToFieldName as EquippedToFieldName, parentArmorId);

    // Finally, add this accessory to the new parent armor
    const [nextParentAccessories, nextParentAccessoryFieldName] =
      findParentArmorAccessories(parentArmorId, getValues);

    // This should always exist but we like to keep ts happy
    if (nextParentAccessoryFieldName) {
      setValue(nextParentAccessoryFieldName, [
        ...nextParentAccessories,
        accessoryArmorId,
      ]);
    }
  };

  return (
    <SelectInput<CwnCharacterData>
      label="Equipped To"
      options={armorOptions}
      placeholder="Select an Armor"
      onChange={onChange}
    />
  );
}
