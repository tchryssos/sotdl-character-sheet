import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { SelectInput } from '~/components/form/SelectInput';
import { KeyName, SelectOption } from '~/components/form/typings';
import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { CwnCharacterData } from '~/typings/cwn/characterData';

interface EquippedToInputProps {
  equippedToFieldName: KeyName<CwnCharacterData>;
  accessoryArmorId: string;
}

const createParentArmorFieldName = makeNestedFieldNameFn<
  CwnCharacterData,
  'armors'
>('armors');

type EquippedToFieldName = `armors.${number}.equippedTo`;

export function EquippedToInput({
  equippedToFieldName,
  accessoryArmorId,
}: EquippedToInputProps) {
  const { watch, setValue, getValues } = useFormContext<CwnCharacterData>();

  const armors = watch('armors');
  const equippedTo = watch(equippedToFieldName as EquippedToFieldName);

  const armorOptions: SelectOption[] = armors.flatMap((armor) => {
    if (armor.weight === 'accessory') {
      return [];
    }
    return [
      {
        label: armor.name,
        value: armor.id,
      },
    ];
  });

  const findParentArmorAccessories = (
    parentId: string
  ): [string[], `armors.${number}.accessories` | null] => {
    // From the armors array, find the armor with the matching id, get its index
    const previousParentArmorIndex = armors.findIndex(
      (armor) => armor.id === parentId
    );

    if (previousParentArmorIndex === -1) {
      return [[], null];
    }

    // Make an armors accessories fieldName based on that index
    const parentAccessoriesFieldName = createParentArmorFieldName(
      'accessories',
      previousParentArmorIndex
    ) as `armors.${number}.accessories`;

    // Get the accessories from the parent armor
    const parentAccessories = getValues(parentAccessoriesFieldName) as string[];

    return [parentAccessories, parentAccessoriesFieldName];
  };

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // First, remove this accessory from the previous parent armor
    const [prevParentAccessories, prevParentAccessoryFieldName] =
      findParentArmorAccessories(equippedTo);

    if (prevParentAccessoryFieldName) {
      setValue(
        prevParentAccessoryFieldName,
        prevParentAccessories.filter(
          (accessory) => accessory !== accessoryArmorId
        )
      );
    }

    // Next, set the equippedTo value to the new parent armor
    const parentArmorId = e.target.value;
    setValue(equippedToFieldName as EquippedToFieldName, parentArmorId);

    // Finally, add this accessory to the new parent armor
    const [nextParentAccessories, nextParentAccessoryFieldName] =
      findParentArmorAccessories(parentArmorId);

    // Unlike above, this should always exist but we like to keep ts happy
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
