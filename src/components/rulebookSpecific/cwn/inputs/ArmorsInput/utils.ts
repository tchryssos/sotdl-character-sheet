import { UseFormGetValues, UseFormReturn } from 'react-hook-form';

import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { CwnCharacterData } from '~/typings/cwn/characterData';

const createParentArmorFieldName = makeNestedFieldNameFn<
  CwnCharacterData,
  'armors'
>('armors');

export const findParentArmorAccessories = (
  parentId: string,
  getValues: UseFormGetValues<CwnCharacterData>
): [string[], `armors.${number}.accessories` | null] => {
  const armors = getValues('armors');
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

export const removeAccessoryFromParentArmor = (
  accessoryId: string,
  parentId: string,
  formMethods: Pick<UseFormReturn<CwnCharacterData>, 'setValue' | 'getValues'>
) => {
  const { setValue, getValues } = formMethods;
  const [parentAccessories, parentAccessoriesFieldName] =
    findParentArmorAccessories(parentId, getValues);

  if (parentAccessoriesFieldName) {
    setValue(
      parentAccessoriesFieldName,
      parentAccessories.filter((accessory) => accessory !== accessoryId)
    );
  }
};
