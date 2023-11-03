import { upperFirst } from 'lodash';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { FormSection } from '~/components/form/FormSection';
import { TextInput } from '~/components/form/TextInput';
import {
  SotwwWeaponTrait,
  WEAPON_PROPERTY_ABBREVIATIONS,
} from '~/constants/sotww/game';
import {
  useBreakpointsAtLeast,
  useBreakpointsLessThan,
} from '~/logic/hooks/useBreakpoints';
import { SortableAddAnotherChildProps } from '~/typings/form';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

import { GripInput } from './GripInput';
import { createWeaponFieldName } from './utils';

interface WeaponInputItemProps
  extends Omit<SortableAddAnotherChildProps, 'sortIndexMap' | 'fieldId'> {}

export function WeaponInputItem({
  postSortIndex: index,
  onDelete,
}: WeaponInputItemProps) {
  const { watch } = useFormContext<SotwwCharacterData>();
  const isLessThanSm = useBreakpointsLessThan('sm');
  const atLeastMd = useBreakpointsAtLeast('md');

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
      columns={isLessThanSm || atLeastMd ? 1 : 2}
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
          <GripInput index={index} />
        </GridBox>
      </GridBox>
    </FormSection>
  );
}
