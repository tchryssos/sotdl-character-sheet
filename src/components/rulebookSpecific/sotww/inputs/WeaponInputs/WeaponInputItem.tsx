import { upperFirst } from 'lodash';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { FormSection } from '~/components/form/FormSection';
import { SelectInput } from '~/components/form/SelectInput';
import { TextInput } from '~/components/form/TextInput';
import { SelectOption } from '~/components/form/typings';
import {
  SotwwWeaponTrait,
  WEAPON_ADVANTAGES,
  WEAPON_DISADVANTAGES,
  WEAPON_PROPERTY_ABBREVIATIONS,
  WEAPON_TRAITS,
} from '~/constants/sotww/game';
import {
  useBreakpointsAtLeast,
  useBreakpointsIsExactly,
  useBreakpointsLessThan,
} from '~/logic/hooks/useBreakpoints';
import { makeSimpleSelectOptionsFromArray } from '~/logic/utils/form/makeSimpleSelectOptionsFromArray';
import { SortableAddAnotherChildProps } from '~/typings/form';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

import { createWeaponFieldName } from './utils';

interface WeaponInputItemProps
  extends Omit<SortableAddAnotherChildProps, 'sortIndexMap' | 'fieldId'> {}

const weaponGripOptions: SelectOption[] = [
  {
    label: 'One',
    value: 'one',
  },
  {
    label: 'Two',
    value: 'two',
  },
  {
    label: 'Off',
    value: 'off',
  },
];

const weaponTraitOptions = makeSimpleSelectOptionsFromArray(WEAPON_TRAITS);

const weaponAdvantageOptions =
  makeSimpleSelectOptionsFromArray(WEAPON_ADVANTAGES);

const weaponDisadvantageOptions =
  makeSimpleSelectOptionsFromArray(WEAPON_DISADVANTAGES);

export function WeaponInputItem({
  postSortIndex: index,
  onDelete,
}: WeaponInputItemProps) {
  const { watch } = useFormContext<SotwwCharacterData>();
  const isLessThanSm = useBreakpointsLessThan('sm');
  const atLeastMd = useBreakpointsAtLeast('md');
  const exactlySm = !isLessThanSm && !atLeastMd;
  const exactlyXss = useBreakpointsLessThan('xs');

  const weaponNameFieldName = createWeaponFieldName('weapon_name', index);
  const weaponDamageFieldName = createWeaponFieldName('weapon_damage', index);
  const weaponTraitsFieldName = createWeaponFieldName('weapon_traits', index);

  const weaponName = watch(weaponNameFieldName) as string;
  const weaponDamage = watch(weaponDamageFieldName) as string;
  const weaponTraits = watch(weaponTraitsFieldName) as SotwwWeaponTrait[];

  const sectionTitle = `${weaponName}, ${weaponDamage}${
    weaponTraits.length && !isLessThanSm
      ? ` (${weaponTraits
          .map((t) => {
            const abbrv = WEAPON_PROPERTY_ABBREVIATIONS[t];
            return upperFirst(abbrv);
          })
          .join(', ')})`
      : ''
  }`;

  return (
    <FormSection
      borderless
      columns={!exactlySm ? 1 : 2}
      isNested
      title={sectionTitle}
      visibilityTitle={`weapon${index}`}
    >
      <GridBox columns={1}>
        <TextInput<SotwwCharacterData>
          label="Name"
          name={weaponNameFieldName}
        />
        <GridBox columns={2}>
          <TextInput<SotwwCharacterData>
            label="Damage"
            name={weaponDamageFieldName}
          />
          <SelectInput<SotwwCharacterData>
            label="Grip"
            name={createWeaponFieldName('weapon_grip', index)}
            options={weaponGripOptions}
          />
        </GridBox>
        <SelectInput<SotwwCharacterData>
          label="Traits"
          multiple
          name={weaponTraitsFieldName}
          options={weaponTraitOptions}
        />
        <GridBox columns={!exactlySm && !exactlyXss ? 2 : 1}>
          <SelectInput<SotwwCharacterData>
            label="Advantages"
            multiple
            name={createWeaponFieldName('weapon_advantages', index)}
            options={weaponAdvantageOptions}
          />
          <SelectInput<SotwwCharacterData>
            label="Disadvantages"
            multiple
            name={createWeaponFieldName('weapon_disadvantages', index)}
            options={weaponDisadvantageOptions}
          />
        </GridBox>
      </GridBox>
    </FormSection>
  );
}
