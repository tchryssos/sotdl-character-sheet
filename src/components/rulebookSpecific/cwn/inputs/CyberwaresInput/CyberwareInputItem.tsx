import { capitalize } from 'lodash';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { AAMItemTitleAndDelete } from '~/components/form/AAMItemTitleAndDelete';
import { AAMItemFormSection } from '~/components/form/containers/AAMItemFormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { SelectInput } from '~/components/form/SelectInput';
import { SelectOption } from '~/components/form/typings';
import {
  CYBERWARE_CONCEALMENT_LEVELS,
  CYBERWARE_TYPE,
  CyberwareAs,
  CyberwareType,
} from '~/constants/cwn/game';
import { CwnCharacterData } from '~/typings/cwn/characterData';
import { SortableAddAnotherChildProps } from '~/typings/form';

import { WeaponAndArmorContext } from '../../WeaponAndArmorProvider';
import { AsInputs } from './AsInputs';
import { createCyberwareFieldName } from './utils';

interface CyberwareInputItemProps
  extends Pick<SortableAddAnotherChildProps, 'onDelete' | 'postSortIndex'> {}

const typeSelectOptions: SelectOption[] = (
  CYBERWARE_TYPE as unknown as string[]
)
  .sort()
  .map((t) => ({
    label: capitalize(t),
    value: t,
  }));

const concealmentSelectOptions: SelectOption[] = (
  CYBERWARE_CONCEALMENT_LEVELS as unknown as string[]
)
  .sort()
  .map((t) => ({
    label: capitalize(t),
    value: t,
  }));

export function CyberwareInputItem({
  onDelete: formOnDelete,
  postSortIndex: index,
}: CyberwareInputItemProps) {
  const { watch, setValue, getValues } = useFormContext<CwnCharacterData>();
  const { weaponFieldArrayMethods, armorFieldArrayMethods } = useContext(
    WeaponAndArmorContext
  );

  const nameFieldName = createCyberwareFieldName('name', index);
  const name = watch(nameFieldName) as string;

  const typeFieldName = createCyberwareFieldName('type', index);
  const type = watch(typeFieldName) as CyberwareType;

  const idFieldName = createCyberwareFieldName('id', index);
  const id = watch(idFieldName) as string;

  const asFieldName = createCyberwareFieldName('as', index);
  const as = watch(asFieldName) as CyberwareAs | null;

  const onDelete = () => {
    if (as) {
      const allRelated = getValues(as);
      const relatedIndex = allRelated.findIndex((r) => r.id === id);

      if (relatedIndex !== -1) {
        const fieldsDelete =
          as === 'armors'
            ? armorFieldArrayMethods?.onDelete
            : weaponFieldArrayMethods?.onDelete;
        fieldsDelete?.(relatedIndex);
      }
    }
    formOnDelete(index);
  };

  const title = name ? `${name} - ${type}` : '';
  return (
    <AAMItemFormSection title={title} visibilityTitle={id}>
      <AAMItemTitleAndDelete<CwnCharacterData>
        index={index}
        label="Name"
        name={nameFieldName}
        onDelete={onDelete}
      />
      <GridBox>
        <SelectInput<CwnCharacterData>
          label="Type"
          name={typeFieldName}
          options={typeSelectOptions}
        />
        <SelectInput<CwnCharacterData>
          label="Concealment"
          name={createCyberwareFieldName('concealment', index)}
          options={concealmentSelectOptions}
        />
      </GridBox>
      <NumberInput<CwnCharacterData>
        label="System Strain"
        min={0}
        name={createCyberwareFieldName('system_strain', index)}
        step={0.25}
      />
      <AsInputs cyberwareId={id} index={index} />
    </AAMItemFormSection>
  );
}
