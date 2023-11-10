import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { FormSection } from '~/components/form/FormSection';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { EditContext } from '~/logic/contexts/editContext';
import { makeDoubleNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { SortableAddAnotherChildProps } from '~/typings/form';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

const createTraditionTalentFieldName = makeDoubleNestedFieldNameFn<
  SotwwCharacterData,
  'magic_traditions',
  'tradition_talents'
>('magic_traditions', 'tradition_talents');

interface TraditionTalentInputItemProps
  extends Pick<SortableAddAnotherChildProps, 'onDelete' | 'postSortIndex'> {
  parentIndex: number;
}

export function TraditionTalentInputItem({
  onDelete,
  postSortIndex: index,
  parentIndex,
}: TraditionTalentInputItemProps) {
  const { watch } = useFormContext();
  const nameFieldName = createTraditionTalentFieldName(
    parentIndex,
    'talent_name',
    index
  );
  const name = watch(nameFieldName) as string;
  const { isEditMode } = useContext(EditContext);

  return (
    <FormSection borderless columns={1} isNested title={name}>
      <GridBox
        alignItems="end"
        gridTemplateColumns={isEditMode ? '1fr auto' : '1fr'}
      >
        <TextInput label="Name" name={nameFieldName} />
        {isEditMode && <DeleteButton onDelete={() => onDelete(index)} />}
      </GridBox>
      <TextAreaInput
        label="Description"
        name={createTraditionTalentFieldName(
          parentIndex,
          'talent_description',
          index
        )}
      />
    </FormSection>
  );
}
