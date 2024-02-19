import { upperFirst } from 'lodash';
import { ChangeEvent, useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { AAMItemFormSection } from '~/components/form/containers/AAMItemFormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { TextInput } from '~/components/form/TextInput';
import { SelectOption } from '~/components/form/typings';
import { ARMOR_WEIGHT } from '~/constants/cwn/game';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { guaranteeNumberValue } from '~/logic/utils/form/guaranteeNumberValue';
import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { CwnArmor, CwnCharacterData } from '~/typings/cwn/characterData';
import { SortableAddAnotherChildProps } from '~/typings/form';

import { AcContext } from '../../AcProvider';

interface ArmorInputItemProps
  extends Pick<SortableAddAnotherChildProps, 'onDelete' | 'postSortIndex'> {
  hideUnequipped: boolean;
}

const createArmorFieldName = makeNestedFieldNameFn<CwnCharacterData, 'armors'>(
  'armors'
);

const armorWeightOptions: SelectOption[] = ARMOR_WEIGHT.map((w) => ({
  label: upperFirst(w),
  value: w,
}));

export function ArmorInputItem({
  postSortIndex: index,
  onDelete,
  hideUnequipped,
}: ArmorInputItemProps) {
  const { setValue, watch, getValues } = useFormContext<CwnCharacterData>();
  const { calculateAc } = useContext(AcContext);
  const isXxs = useBreakpointsLessThan('xs');
  const lessThanSm = useBreakpointsLessThan('sm');

  const nameFieldName = createArmorFieldName('name', index);
  const name = watch(nameFieldName) as string;

  const equippedFieldName = createArmorFieldName('equipped', index);
  const equipped = watch(equippedFieldName) as boolean;

  const setAC = (armorName: keyof CwnArmor, value: number) => {
    setValue(
      createArmorFieldName(armorName, index),
      guaranteeNumberValue(value)
    );
    calculateAc(getValues('armors')[index]);
  };

  return (
    <AAMItemFormSection
      title={name}
      titleColor={equipped ? 'text' : 'textAccent'}
      visibilityTitle={`${name}${index}`}
    >
      <GridBox gridTemplateColumns={isXxs ? '1fr' : 'auto 1fr'}>
        <CheckboxInput
          customOnChange={() => {
            setValue(equippedFieldName, !equipped);
            // Only one armor can be worn at a time,
            // so unequip any other equipped armor when equipping this one
            getValues('armors').forEach((a, i) => {
              if (i !== index && a.equipped) {
                const otherEquippedName = createArmorFieldName('equipped', i);
                setValue(otherEquippedName, false);
              }
            });
          }}
          inputLike
          isChecked={equipped}
          label="Equipped"
          name={equippedFieldName}
        />
        <TextInput<CwnCharacterData> label="Name" name={nameFieldName} />
      </GridBox>
      <GridBox columns={lessThanSm ? 2 : 4}>
        <NumberInput<CwnCharacterData>
          customOnChange={(e) =>
            setAC('ac_melee', guaranteeNumberValue(e.target.value))
          }
          label="AC Melee"
          min={0}
          name={createArmorFieldName('ac_melee', index)}
        />
        <NumberInput<CwnCharacterData>
          customOnChange={(e) =>
            setAC('ac_ranged', guaranteeNumberValue(e.target.value))
          }
          label={isXxs ? 'AC Range' : 'AC Ranged'}
          min={0}
          name={createArmorFieldName('ac_ranged', index)}
        />
        <NumberInput<CwnCharacterData>
          label={isXxs ? 'Dmg Soak' : 'Damage Soak'}
          min={0}
          name={createArmorFieldName('damage_soak', index)}
        />
        <NumberInput<CwnCharacterData>
          label={isXxs ? 'Trauma Mod' : 'Trauma Target Mod'}
          min={0}
          name={createArmorFieldName('trauma_target_mod', index)}
        />
      </GridBox>
    </AAMItemFormSection>
  );
}
