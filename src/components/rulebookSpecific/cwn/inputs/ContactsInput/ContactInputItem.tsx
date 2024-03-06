import { capitalize } from 'lodash';
import { useFormContext } from 'react-hook-form';

import { AAMItemTitleAndDelete } from '~/components/form/AAMItemTitleAndDelete';
import { AAMItemFormSection } from '~/components/form/containers/AAMItemFormSection';
import { SelectInput } from '~/components/form/SelectInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { SelectOption } from '~/components/form/typings';
import { CONTACT_RELATIONSHIPS } from '~/constants/cwn/game';
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
      <AAMItemTitleAndDelete<CwnCharacterData>
        index={index}
        label="Name"
        name={contactNameFieldName}
        onDelete={onDelete}
      />
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
