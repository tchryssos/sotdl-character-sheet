import { capitalize } from 'lodash';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { AAMItemTitleAndDelete } from '~/components/form/AAMItemTitleAndDelete';
import { AAMItemFormSection } from '~/components/form/containers/AAMItemFormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { SelectInput } from '~/components/form/SelectInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { SelectOption } from '~/components/form/typings';
import {
  CYBERWARE_CONCEALMENT_LEVELS,
  CYBERWARE_TYPE,
  CyberwareAs,
  CyberwareType,
} from '~/constants/cwn/game';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsIsExactly } from '~/logic/hooks/useBreakpoints';
import {
  CwnArmor,
  CwnCharacterData,
  CwnWeapon,
} from '~/typings/cwn/characterData';
import { SortableAddAnotherChildProps } from '~/typings/form';

import { CyberwareAsInputs } from './CyberwareAsInputs';
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
  const isXxs = useBreakpointsIsExactly('xxs');
  const { isEditMode } = useContext(EditContext);
  const { watch, getValues, setValue } = useFormContext<CwnCharacterData>();

  const nameFieldName = createCyberwareFieldName('name', index);
  const name = watch(nameFieldName) as string;

  const typeFieldName = createCyberwareFieldName('cyberware_type', index);
  const type = watch(typeFieldName) as CyberwareType;

  const idFieldName = createCyberwareFieldName('id', index);
  const id = watch(idFieldName) as string;

  const asFieldName = createCyberwareFieldName('as', index);
  const as = watch(asFieldName) as CyberwareAs | null;

  const onDelete = () => {
    if (as) {
      const allRelated = getValues(as);
      setValue(
        as,
        allRelated.filter((r) => r.id !== id) as CwnWeapon[] | CwnArmor[]
      );
    }
    formOnDelete(index);
  };

  const title = name ? `${name} - ${capitalize(type)}` : '';
  return (
    <AAMItemFormSection linkId={id} title={title}>
      <AAMItemTitleAndDelete<CwnCharacterData>
        index={index}
        label="Name"
        name={nameFieldName}
        onDelete={onDelete}
      />
      <GridBox columns={isXxs ? 2 : 3}>
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
        <NumberInput<CwnCharacterData>
          label="System Strain"
          min={0}
          name={createCyberwareFieldName('system_strain', index)}
          step={0.25}
        />
        {!isEditMode && <CyberwareAsInputs cyberwareId={id} index={index} />}
      </GridBox>
      {isEditMode && <CyberwareAsInputs cyberwareId={id} index={index} />}
      <TextAreaInput<CwnCharacterData>
        label="Effect"
        name={createCyberwareFieldName('effect', index)}
      />
      <TextAreaInput<CwnCharacterData>
        label="Description/Mods"
        name={createCyberwareFieldName('description', index)}
      />
    </AAMItemFormSection>
  );
}
