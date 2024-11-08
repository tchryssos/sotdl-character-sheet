import { useFormContext } from 'react-hook-form';

import { AAMItemTitleAndDelete } from '~/components/form/AAMItemTitleAndDelete';
import { AAMItemFormSection } from '~/components/form/containers/AAMItemFormSection';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { CwnCharacterData } from '~/typings/cwn/characterData';
import { SortableAddAnotherChildProps } from '~/typings/form';

interface OtherStatusInputItemProps
  extends Pick<SortableAddAnotherChildProps, 'onDelete' | 'postSortIndex'> {}

const createStatusFieldName = makeNestedFieldNameFn<
  CwnCharacterData,
  'other_statuses'
>('other_statuses');

export function OtherStatusInputItem({
  onDelete,
  postSortIndex: index,
}: OtherStatusInputItemProps) {
  const { watch } = useFormContext<CwnCharacterData>();

  const nameFieldName = createStatusFieldName('name', index);
  const name = watch(nameFieldName);

  return (
    <AAMItemFormSection title={name}>
      <AAMItemTitleAndDelete<CwnCharacterData>
        index={index}
        label="Name"
        name={nameFieldName}
        onDelete={onDelete}
      />
      <TextAreaInput<CwnCharacterData>
        label="Description"
        name={createStatusFieldName('description', index)}
      />
    </AAMItemFormSection>
  );
}
