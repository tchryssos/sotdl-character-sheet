import { capitalize } from 'lodash';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { AAMItemTitleAndDelete } from '~/components/form/AAMItemTitleAndDelete';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { AAMItemFormSection } from '~/components/form/containers/AAMItemFormSection';
import { SelectInput } from '~/components/form/SelectInput';
import { SelectOption } from '~/components/form/typings';
import { WEAPON_TYPES } from '~/constants/cwn/game';
import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { CwnCharacterData } from '~/typings/cwn/characterData';
import { SortableAddAnotherChildProps } from '~/typings/form';

interface WeaponInputItemProps
  extends Pick<SortableAddAnotherChildProps, 'postSortIndex' | 'onDelete'> {}

const createWeaponFieldName = makeNestedFieldNameFn<
  CwnCharacterData,
  'weapons'
>('weapons');

const weaponTypeOptions: SelectOption[] = WEAPON_TYPES.map((t) => ({
  label: capitalize(t),
  value: t,
}));

export function WeaponInputItem({
  postSortIndex: index,
  onDelete,
}: WeaponInputItemProps) {
  const { setValue, watch, getValues } = useFormContext<CwnCharacterData>();

  const nameFieldName = createWeaponFieldName('name', index);
  const name = watch(nameFieldName) as string;

  const readiedFieldName = createWeaponFieldName('readied', index);
  const readied = watch(readiedFieldName) as boolean;

  const title = `${name}`;

  return (
    <AAMItemFormSection
      title={title}
      titleColor={readied ? 'text' : 'textAccent'}
      visibilityTitle={`${name}${index}`}
    >
      <GridBox gridTemplateColumns={{ base: '1fr', xs: 'auto 1fr' }}>
        <CheckboxInput
          alwaysEditable
          customOnChange={() => {
            setValue(readiedFieldName, !readied);
            const weapons = getValues('weapons');
            // Only one weapon can be readied at a time
            weapons.forEach((_, i) => {
              if (i !== index) {
                setValue(createWeaponFieldName('readied', i), false);
              }
            });
          }}
          inputLike
          isChecked={readied}
          label="Readied"
          name={readiedFieldName}
        />
        <AAMItemTitleAndDelete<CwnCharacterData>
          index={index}
          label="Name"
          name={nameFieldName}
          onDelete={onDelete}
        />
        {/* <GridBox>
          <SelectInput<CwnCharacterData>
            label="Type"
            name={createWeaponFieldName('type', index)}
            options={weaponTypeOptions}
          />
        </GridBox> */}
      </GridBox>
    </AAMItemFormSection>
  );
}
