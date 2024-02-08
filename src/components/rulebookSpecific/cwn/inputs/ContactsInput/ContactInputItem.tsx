import { capitalize } from 'lodash';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiDelete } from '~/components/buttons/DeleteButton';
import { AAMItemFormSection } from '~/components/form/AAMItemFormSection';
import { SelectInput } from '~/components/form/SelectInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { SelectOption } from '~/components/form/typings';
import { CONTACT_RELATIONSHIPS } from '~/constants/cwn/game';
import { EditContext } from '~/logic/contexts/editContext';
import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { CwnCharacterData } from '~/typings/cwn/characterData';
import { SortableAddAnotherChildProps } from '~/typings/form';

interface ContactInputProps
  extends Omit<SortableAddAnotherChildProps, 'fieldId' | 'sortIndexMap'> {}

const createContactFieldName = makeNestedFieldNameFn<
  CwnCharacterData,
  'contacts'
>('contacts');

const relationshipSelectOptions: SelectOption[] = CONTACT_RELATIONSHIPS.map(
  (r) => ({
    label: capitalize(r),
    value: r,
  })
);

export function ContactInputItem({
  postSortIndex: index,
  onDelete,
}: ContactInputProps) {
  const { isEditMode } = useContext(EditContext);
  const { watch } = useFormContext<CwnCharacterData>();

  const contactNameFieldName = createContactFieldName('name', index);
  const contactName = watch(contactNameFieldName);

  const contactRelationshipFieldName = createContactFieldName(
    'relationship',
    index
  );
  const contactRelationship = watch(contactRelationshipFieldName);

  return (
    <AAMItemFormSection
      title={`${contactName} - ${capitalize(contactRelationship)}`}
      visibilityTitle={`${contactName}${index}`}
    >
      <GridBox
        alignItems="end"
        gridTemplateColumns={isEditMode ? '1fr auto' : '1fr'}
      >
        <TextInput<CwnCharacterData> label="Name" name={contactNameFieldName} />
        {isEditMode && (
          <AddAnotherMultiDelete onDelete={() => onDelete(index)} />
        )}
      </GridBox>
      <SelectInput<CwnCharacterData>
        label="Relationship"
        name={contactRelationshipFieldName}
        options={relationshipSelectOptions}
      />
      <TextAreaInput<CwnCharacterData>
        label="Description"
        name={createContactFieldName('description', index)}
      />
    </AAMItemFormSection>
  );
}
