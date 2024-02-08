import { useFormContext } from 'react-hook-form';

import { AAMItemTitleAndDelete } from '~/components/form/AAMItemTitleAndDelete';
import { AAMItemFormSection } from '~/components/form/containers/AAMItemFormSection';
import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { CwnCharacterData } from '~/typings/cwn/characterData';
import { SortableAddAnotherChildProps } from '~/typings/form';

const createFocusFieldName = makeNestedFieldNameFn<CwnCharacterData, 'foci'>(
  'foci'
);

interface FocusInputItemProps
  extends Omit<SortableAddAnotherChildProps, 'fieldId' | 'sortIndexMap'> {}

export function FocusInputItem({
  postSortIndex: index,
  onDelete,
}: FocusInputItemProps) {
  const { watch } = useFormContext<CwnCharacterData>();

  const focusNameFieldName = createFocusFieldName('name', index);
  const focusName = watch(focusNameFieldName);

  return (
    <AAMItemFormSection
      title={focusName as string}
      visibilityTitle={`focus${focusName}${index}`}
    >
      <AAMItemTitleAndDelete<CwnCharacterData>
        index={index}
        label="Name"
        name={focusNameFieldName}
        onDelete={onDelete}
      />
    </AAMItemFormSection>
  );
}
