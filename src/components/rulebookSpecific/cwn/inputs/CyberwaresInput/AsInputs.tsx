import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
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
import { createCyberwareFieldName } from './utils';

interface AsInputProps {
  index: number;
  cyberwareId: string;
}

export function AsInputs({ index, cyberwareId }: AsInputProps) {
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

    // If checking a new 'as', set it and create the appropriate related item
    if (!currentAs) {
      setValue(asFieldName, whichAsCheck);
    } else if (currentAs === whichAsCheck) {
      // If unchecking active 'as', set to null and delete association, if any
      const related = getValues(currentAs);
      setValue(
        currentAs,
        related.filter((r) => r.id !== cyberwareId) as CwnWeapon[] | CwnArmor[]
      );
      setValue(asFieldName, null);
    } else {
      // If switching from one as to the other,
      // delete the old association and create the new one, then change the value
    }
  };

  return (
    <Label label="Use as..." labelFor={asFieldName}>
      <FlexBox flexDirection="column" gap={8} marginTop={4}>
        <Text color="textAccent" variant="body-xs">
          You can use the checkboxes below to add this cyberware to your weapons
          or armors list
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
