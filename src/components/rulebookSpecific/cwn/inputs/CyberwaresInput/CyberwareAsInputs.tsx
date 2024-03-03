import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { Label } from '~/components/form/Label';
import { Text } from '~/components/Text';
import { CYBERWARE_AS, CyberwareAs } from '~/constants/cwn/game';
import { EditContext } from '~/logic/contexts/editContext';
import {
  CwnArmor,
  CwnCharacterData,
  CwnWeapon,
} from '~/typings/cwn/characterData';

import { DEFAULT_ARMOR } from '../ArmorsInput/consts';
import { DEFAULT_WEAPON } from '../WeaponsInput/consts';
import { createCyberwareFieldName } from './utils';

interface AsInputProps {
  index: number;
  cyberwareId: string;
}

export function CyberwareAsInputs({ index, cyberwareId }: AsInputProps) {
  const { isEditMode } = useContext(EditContext);
  const { setValue, getValues, watch, register } =
    useFormContext<CwnCharacterData>();

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
      setValue(
        currentAs,
        getValues(currentAs).filter(
          (r: CwnWeapon | CwnArmor) => r.id !== cyberwareId
        ) as CwnWeapon[] | CwnArmor[]
      );
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

      setValue(whichAsCheck, [
        ...getValues(whichAsCheck),
        {
          ...(whichAsCheck === 'armors' ? DEFAULT_ARMOR : DEFAULT_WEAPON),
          ...shared,
        },
      ] as CwnArmor[] | CwnWeapon[]);
    }

    setValue(asFieldName, nextAsValue);
  };

  if (!isEditMode) {
    if (watchedAs) {
      return (
        <Label label="Used as" labelFor={asFieldName}>
          <Text
            color="textAccent"
            display="block"
            paddingTop={8}
            variant="body-xs"
          >
            {watchedAs === 'armors' ? 'an Armor' : 'a Weapon'}
          </Text>
        </Label>
      );
    }
    return null;
  }

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
