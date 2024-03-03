import { capitalize } from 'lodash';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { AAMItemTitleAndDelete } from '~/components/form/AAMItemTitleAndDelete';
import { AAMItemFormSection } from '~/components/form/containers/AAMItemFormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { SelectInput } from '~/components/form/SelectInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import {
  PROGRAM_VERB_TARGET_OPTIONS,
  ProgramVerbTarget,
} from '~/constants/cwn/game';
import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { CwnCharacterData } from '~/typings/cwn/characterData';
import { SortableAddAnotherChildProps } from '~/typings/form';

interface ProgramSubjectInputItemProps
  extends Pick<SortableAddAnotherChildProps, 'onDelete' | 'postSortIndex'> {}

const createVerbFieldName = makeNestedFieldNameFn<
  CwnCharacterData,
  'program_verbs'
>('program_verbs');

export function ProgramVerbInputItem({
  onDelete,
  postSortIndex: index,
}: ProgramSubjectInputItemProps) {
  const { watch } = useFormContext<CwnCharacterData>();

  const nameFieldName = createVerbFieldName('name', index);
  const name = watch(nameFieldName) as string;

  const targetsFieldName = createVerbFieldName('target_types', index);
  const targets = watch(targetsFieldName) as ProgramVerbTarget[];

  return (
    <AAMItemFormSection
      title={
        name ? `${name} - ${targets.map((t) => capitalize(t)).join(', ')}` : ''
      }
    >
      <AAMItemTitleAndDelete<CwnCharacterData>
        index={index}
        label="Verb"
        name={nameFieldName}
        onDelete={onDelete}
      />
      <SelectInput<CwnCharacterData>
        label="Target Types"
        multiple
        name={targetsFieldName}
        options={PROGRAM_VERB_TARGET_OPTIONS}
      />
      <GridBox>
        <NumberInput<CwnCharacterData>
          label="Access Cost"
          min={0}
          name={createVerbFieldName('access_cost', index)}
        />
        <NumberInput<CwnCharacterData>
          label="Skill Check Mod."
          name={createVerbFieldName('skill_check_mod', index)}
        />
      </GridBox>
      <TextAreaInput<CwnCharacterData>
        label="Use"
        name={createVerbFieldName('use', index)}
      />
    </AAMItemFormSection>
  );
}
