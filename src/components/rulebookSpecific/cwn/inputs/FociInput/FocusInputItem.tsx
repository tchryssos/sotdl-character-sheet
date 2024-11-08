import { useFormContext } from 'react-hook-form';

import { AAMItemTitleAndDelete } from '~/components/form/AAMItemTitleAndDelete';
import { AAMItemFormSection } from '~/components/form/containers/AAMItemFormSection';
import { SelectInput } from '~/components/form/SelectInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { SelectOption } from '~/components/form/typings';
import { FOCUS_LEVELS } from '~/constants/cwn/game';
import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { CwnCharacterData } from '~/typings/cwn/characterData';
import { SortableAddAnotherChildProps } from '~/typings/form';

const createFocusFieldName = makeNestedFieldNameFn<CwnCharacterData, 'foci'>(
  'foci'
);

const focusLevelSelectOptions: SelectOption[] = FOCUS_LEVELS.map((l) => ({
  label: l,
  value: l,
}));

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
    <AAMItemFormSection title={focusName as string}>
      <AAMItemTitleAndDelete<CwnCharacterData>
        index={index}
        label="Name"
        name={focusNameFieldName}
        onDelete={onDelete}
      />
      <SelectInput<CwnCharacterData>
        label="Level"
        name={createFocusFieldName('level', index)}
        options={focusLevelSelectOptions}
      />
      <TextAreaInput<CwnCharacterData>
        label="Description"
        name={createFocusFieldName('description', index)}
      />
    </AAMItemFormSection>
  );
}
