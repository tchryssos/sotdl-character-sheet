import { useFormContext } from 'react-hook-form';

import { AAMItemTitleAndDelete } from '~/components/form/AAMItemTitleAndDelete';
import { AAMItemFormSection } from '~/components/form/containers/AAMItemFormSection';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { CwnCharacterData } from '~/typings/cwn/characterData';
import { SortableAddAnotherChildProps } from '~/typings/form';

const createInjuryFieldName = makeNestedFieldNameFn<
  CwnCharacterData,
  'major_injuries'
>('major_injuries');

interface InjuryInputItemProps
  extends Pick<SortableAddAnotherChildProps, 'onDelete' | 'postSortIndex'> {}
export function InjuryInputItem({
  postSortIndex: index,
  onDelete,
}: InjuryInputItemProps) {
  const { watch } = useFormContext<CwnCharacterData>();

  const nameFieldName = createInjuryFieldName('name', index);
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
        name={createInjuryFieldName('description', index)}
      />
    </AAMItemFormSection>
  );
}
