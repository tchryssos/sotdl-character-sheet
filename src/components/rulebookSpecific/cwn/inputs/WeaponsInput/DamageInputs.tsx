import { useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { Label } from '~/components/form/Label';
import { NumberInput } from '~/components/form/NumberInput';
import { Text } from '~/components/Text';
import { EditContext } from '~/logic/contexts/editContext';
import { guaranteeNumberValue } from '~/logic/utils/form/guaranteeNumberValue';
import { CwnCharacterData, CwnWeapon } from '~/typings/cwn/characterData';

import { DEFAULT_WEAPON } from './consts';
import { createWeaponFieldName } from './utils';

const replaceDamageNumber = (
  index: number,
  value: number | string,
  prevValue: CwnWeapon['damage']
): CwnWeapon['damage'] => {
  const newArr: CwnWeapon['damage'] = [...prevValue];
  newArr[index] = guaranteeNumberValue(value);
  return newArr;
};

interface DamageInputsProps {
  index: number;
}

export function DamageInputs({ index }: DamageInputsProps) {
  const [damageArr, setDamageArr] = useState(DEFAULT_WEAPON.damage);
  const { isEditMode } = useContext(EditContext);
  const { setValue } = useFormContext<CwnCharacterData>();
  const damageFieldName = createWeaponFieldName('damage', index);

  useEffect(() => {
    setValue(damageFieldName, damageArr, { shouldDirty: true });
  }, [damageArr, damageFieldName, setValue]);
  return (
    <Label label="Damage" labelFor={damageFieldName}>
      {isEditMode ? (
        <GridBox gridTemplateColumns="3fr 2fr">
          <GridBox alignItems="end" gridTemplateColumns="1fr auto 1fr">
            <NumberInput
              customOnChange={(e) => {
                const { value } = e.target;
                setDamageArr((prev) => replaceDamageNumber(0, value, prev));
              }}
              hideLabel
              min={1}
              name={`${damageFieldName}.0`}
            />
            <Text fontWeight="bold" marginBottom={10}>
              d
            </Text>
            <NumberInput
              customOnChange={(e) => {
                const { value } = e.target;
                setDamageArr((prev) => replaceDamageNumber(1, value, prev));
              }}
              hideLabel
              min={2}
              name={`${damageFieldName}.1`}
            />
          </GridBox>
          <GridBox alignItems="end" gridTemplateColumns="auto 1fr">
            <Text fontWeight="bold" marginBottom={10}>
              +
            </Text>
            <NumberInput
              customOnChange={(e) => {
                const { value } = e.target;
                setDamageArr((prev) => replaceDamageNumber(2, value, prev));
              }}
              hideLabel
              name={`${damageFieldName}.2`}
            />
          </GridBox>
        </GridBox>
      ) : (
        <Text>
          {damageArr[0]}d{damageArr[1]}
          {damageArr[2] !== 0 ? `+${damageArr[2]}` : ''}
        </Text>
      )}
    </Label>
  );
}
