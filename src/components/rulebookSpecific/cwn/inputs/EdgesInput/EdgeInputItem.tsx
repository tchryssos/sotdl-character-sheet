import { useFormContext } from 'react-hook-form';

import { AAMItemTitleAndDelete } from '~/components/form/AAMItemTitleAndDelete';
import { AAMItemFormSection } from '~/components/form/containers/AAMItemFormSection';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { CwnCharacterData } from '~/typings/cwn/characterData';
import { SortableAddAnotherChildProps } from '~/typings/form';

interface EdgeInputProps
  extends Omit<SortableAddAnotherChildProps, 'fieldId' | 'sortIndexMap'> {}

const createEdgeFieldName = makeNestedFieldNameFn<CwnCharacterData, 'edges'>(
  'edges'
);

export function EdgeInputItem({ onDelete, postSortIndex }: EdgeInputProps) {
  const { watch } = useFormContext<CwnCharacterData>();

  const nameFieldName = createEdgeFieldName('name', postSortIndex);
  const name = watch(nameFieldName);
  return (
    <AAMItemFormSection title={name}>
      <AAMItemTitleAndDelete<CwnCharacterData>
        index={postSortIndex}
        label="Edge Name"
        name={nameFieldName}
        onDelete={onDelete}
      />
      <TextAreaInput<CwnCharacterData>
        label="Edge Description"
        name={createEdgeFieldName('description', postSortIndex)}
      />
    </AAMItemFormSection>
  );
}
