import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { Label } from '~/components/form/Label';
import { Text } from '~/components/Text';
import { CYBERWARE_AS, CyberwareAs } from '~/constants/cwn/game';
import {
  CwnArmor,
  CwnCharacterData,
  CwnWeapon,
} from '~/typings/cwn/characterData';

import { WeaponAndArmorContext } from '../../WeaponAndArmorProvider';
import { DEFAULT_ARMOR } from '../ArmorsInput/consts';
import { DEFAULT_WEAPON } from '../WeaponsInput/consts';
import { createCyberwareFieldName } from './utils';

interface AsInputProps {
  index: number;
  cyberwareId: string;
}

export function CyberwareAsInputs({ index, cyberwareId }: AsInputProps) {
  const { setValue, getValues, watch, register } =
    useFormContext<CwnCharacterData>();
  const { weaponFieldArrayMethods, armorFieldArrayMethods } = useContext(
    WeaponAndArmorContext
  );

  const asFieldName = createCyberwareFieldName('as', index);
  const watchedAs = watch(asFieldName) as CyberwareAs | null;

  useEffect(() => {
    register(asFieldName);
  }, [asFieldName, register]);

  const createOnChange = (whichAsCheck: CyberwareAs) => () => {
    const currentAs = getValues(asFieldName) as CyberwareAs | null;
    let nextAsValue: CyberwareAs | null = whichAsCheck;

    // If the cyberware is already associated to a weapon or armor, remove it
    if (currentAs) {
      const related = getValues(currentAs);
      const relatedIndex = related.findIndex(
        (r: CwnWeapon | CwnArmor) => r.id === cyberwareId
      );
      if (relatedIndex !== -1) {
        if (currentAs === 'weapons') {
          weaponFieldArrayMethods?.onDelete(relatedIndex);
        } else {
          armorFieldArrayMethods?.onDelete(relatedIndex);
        }
      }
    }

    // If unchecking the current 'as', set the value to null
    if (currentAs === whichAsCheck) {
      nextAsValue = null;
    } else {
      // Add the current cyberware to the new related list
      const shared = {
        id: cyberwareId,
        name:
          (getValues(createCyberwareFieldName('name', index)) as string) || '',
        description:
          (getValues(
            createCyberwareFieldName('description', index)
          ) as string) || '',
      };

      if (whichAsCheck === 'weapons') {
        weaponFieldArrayMethods?.onCreate({
          ...DEFAULT_WEAPON,
          ...shared,
        });
      } else {
        armorFieldArrayMethods?.onCreate({
          ...DEFAULT_ARMOR,
          ...shared,
        });
      }
    }

    setValue(asFieldName, nextAsValue);
  };

  return (
    <Label label="Use as..." labelFor={asFieldName}>
      <FlexBox flexDirection="column" gap={8} marginTop={4}>
        <Text color="textAccent" variant="body-xs">
          You can use the checkboxes below to add a copy of this cyberware to
          your weapons or armors list
        </Text>
        <FlexBox gap={16}>
          {CYBERWARE_AS.map((as) => (
            <CheckboxInput
              customOnChange={createOnChange(as)}
              inputLike
              isChecked={watchedAs === as}
              key={as}
              label={as === 'weapons' ? 'Weapon' : 'Armor'}
              name={asFieldName}
            />
          ))}
        </FlexBox>
      </FlexBox>
    </Label>
  );
}
