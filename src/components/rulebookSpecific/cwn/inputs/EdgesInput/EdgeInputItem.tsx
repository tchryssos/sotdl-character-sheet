import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiDelete } from '~/components/buttons/DeleteButton';
import { AAMItemFormSection } from '~/components/form/containers/AAMItemFormSection';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { EditContext } from '~/logic/contexts/editContext';
import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { CwnCharacterData } from '~/typings/cwn/characterData';
import { SortableAddAnotherChildProps } from '~/typings/form';

interface EdgeInputProps
  extends Omit<SortableAddAnotherChildProps, 'fieldId' | 'sortIndexMap'> {}

const createEdgeFieldName = makeNestedFieldNameFn<CwnCharacterData, 'edges'>(
  'edges'
);

export function EdgeInputItem({ onDelete, postSortIndex }: EdgeInputProps) {
  const { isEditMode } = useContext(EditContext);

  const { watch } = useFormContext<CwnCharacterData>();

  const nameFieldName = createEdgeFieldName('name', postSortIndex);
  const name = watch(nameFieldName);
  return (
    <AAMItemFormSection
      title={name}
      visibilityTitle={`${name}${postSortIndex}`}
    >
      <GridBox
        alignItems="end"
        gridTemplateColumns={isEditMode ? '1fr auto' : '1fr'}
      >
        <TextInput<CwnCharacterData> label="Edge Name" name={nameFieldName} />
        {isEditMode && (
          <AddAnotherMultiDelete onDelete={() => onDelete(postSortIndex)} />
        )}
      </GridBox>
      <TextAreaInput<CwnCharacterData>
        label="Edge Description"
        name={createEdgeFieldName('description', postSortIndex)}
      />
    </AAMItemFormSection>
  );
}
