import { upperFirst } from 'lodash';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/containers/FormSection';
import { SelectInput } from '~/components/form/SelectInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { SelectOption } from '~/components/form/typings';
import { PropertyPills } from '~/components/rulebookSpecific/sotww/inputs/WeaponInputs/PropertyPills';
import {
  SotwwWeaponTrait,
  WEAPON_PROPERTY_ABBREVIATIONS,
  WEAPON_TRAIT_KEYS,
} from '~/constants/sotww/game';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { makeSimpleSelectOptionsFromArray } from '~/logic/utils/form/makeSimpleSelectOptionsFromArray';
import { SortableAddAnotherChildProps } from '~/typings/form';
import { SotwwCharacterData, SotwwWeapon } from '~/typings/sotww/characterData';

import { createWeaponFieldName } from './utils';

interface WeaponInputItemProps
  extends Omit<SortableAddAnotherChildProps, 'sortIndexMap' | 'fieldId'> {}

const weaponGripOptions: SelectOption<SotwwWeapon['weapon_grip']>[] = [
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

const weaponTraitOptions = makeSimpleSelectOptionsFromArray(WEAPON_TRAIT_KEYS);

export function WeaponInputItem({
  postSortIndex: index,
  onDelete,
}: WeaponInputItemProps) {
  const { isEditMode } = useContext(EditContext);
  const { watch } = useFormContext<SotwwCharacterData>();
  const isLessThanSm = useBreakpointsLessThan('sm');
  const exactlyXss = useBreakpointsLessThan('xs');

  const weaponNameFieldName = createWeaponFieldName('weapon_name', index);
  const weaponDamageFieldName = createWeaponFieldName('weapon_damage', index);
  const weaponTraitsFieldName = createWeaponFieldName('weapon_traits', index);
  const weaponEquippedFieldName = createWeaponFieldName(
    'weapon_equipped',
    index
  );

  const weaponName = watch(weaponNameFieldName) as string;
  const weaponDamage = watch(weaponDamageFieldName) as string;
  const weaponTraits = watch(weaponTraitsFieldName) as SotwwWeaponTrait[];
  const weaponEquipped = watch(weaponEquippedFieldName) as boolean;

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
      columns={1}
      isNested
      title={sectionTitle}
      titleColor={weaponEquipped ? 'text' : 'textAccent'}
    >
      <GridBox gridTemplateColumns={exactlyXss ? '1fr' : 'auto 1fr'}>
        <CheckboxInput<SotwwCharacterData>
          alwaysEditable
          label="Equipped"
          name={weaponEquippedFieldName}
        />
        <TextInput<SotwwCharacterData>
          label="Name"
          name={weaponNameFieldName}
        />
      </GridBox>
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
        DisplayComponent={PropertyPills}
        label="Traits"
        multiple
        name={weaponTraitsFieldName}
        options={weaponTraitOptions}
      />
      <TextAreaInput<SotwwCharacterData>
        label="Description"
        name={createWeaponFieldName('weapon_description', index)}
      />
      {isEditMode && (
        <FlexBox justifyContent="flex-end">
          <DeleteButton onDelete={() => onDelete(index)} />
        </FlexBox>
      )}
    </FormSection>
  );
}
