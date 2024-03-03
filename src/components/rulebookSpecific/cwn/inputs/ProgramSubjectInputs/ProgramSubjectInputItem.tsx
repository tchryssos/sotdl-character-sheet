import { capitalize } from 'lodash';
import { useFormContext } from 'react-hook-form';

import { AAMItemTitleAndDelete } from '~/components/form/AAMItemTitleAndDelete';
import { AAMItemFormSection } from '~/components/form/containers/AAMItemFormSection';
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

const createSubjectFieldName = makeNestedFieldNameFn<
  CwnCharacterData,
  'program_subjects'
>('program_subjects');

export function ProgramSubjectInputItem({
  onDelete,
  postSortIndex: index,
}: ProgramSubjectInputItemProps) {
  const { watch } = useFormContext<CwnCharacterData>();

  const nameFieldName = createSubjectFieldName('name', index);
  const name = watch(nameFieldName) as string;

  const typeFieldName = createSubjectFieldName('subject_type', index);
  const type = watch(typeFieldName) as ProgramVerbTarget;

  return (
    <AAMItemFormSection title={name ? `${name} - ${capitalize(type)}` : ''}>
      <AAMItemTitleAndDelete<CwnCharacterData>
        index={index}
        label="Subject"
        name={nameFieldName}
        onDelete={onDelete}
      />
      <SelectInput<CwnCharacterData>
        label="Subject Type"
        name={typeFieldName}
        options={PROGRAM_VERB_TARGET_OPTIONS}
      />
      <TextAreaInput<CwnCharacterData>
        label="Description"
        name={createSubjectFieldName('description', index)}
      />
    </AAMItemFormSection>
  );
}
