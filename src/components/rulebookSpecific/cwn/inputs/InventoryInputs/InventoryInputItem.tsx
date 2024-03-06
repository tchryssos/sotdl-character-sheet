import { useFormContext } from 'react-hook-form';

import { AAMItemTitleAndDelete } from '~/components/form/AAMItemTitleAndDelete';
import { AAMItemFormSection } from '~/components/form/containers/AAMItemFormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { CwnCharacterData } from '~/typings/cwn/characterData';
import { SortableAddAnotherChildProps } from '~/typings/form';

interface InventoryInputItemProps
  extends Pick<SortableAddAnotherChildProps, 'onDelete' | 'postSortIndex'> {}

const createInventoryFieldName = makeNestedFieldNameFn<
  CwnCharacterData,
  'inventory'
>('inventory');

export function InventoryInputItem({
  onDelete,
  postSortIndex: index,
}: InventoryInputItemProps) {
  const { watch } = useFormContext<CwnCharacterData>();

  const nameFieldName = createInventoryFieldName('name', index);
  const name = watch(nameFieldName) as string;

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
        name={createInventoryFieldName('description', index)}
      />
      <NumberInput<CwnCharacterData>
        label="Encumbrance"
        name={createInventoryFieldName('encumbrance', index)}
      />
    </AAMItemFormSection>
  );
}
