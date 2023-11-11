import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { FormSection } from '~/components/form/FormSection';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { EditContext } from '~/logic/contexts/editContext';
import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { SortableAddAnotherChildProps } from '~/typings/form';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

interface EquipmentInputItemProps
  extends Pick<SortableAddAnotherChildProps, 'onDelete' | 'postSortIndex'> {}

const createEquipmentFieldName = makeNestedFieldNameFn<
  SotwwCharacterData,
  'equipment'
>('equipment');

export function EquipmentInputItem({
  onDelete,
  postSortIndex: index,
}: EquipmentInputItemProps) {
  const { isEditMode } = useContext(EditContext);

  const { watch } = useFormContext<SotwwCharacterData>();
  const equipmentNameFieldName = createEquipmentFieldName(
    'equipment_name',
    index
  );
  const equipmentName = watch(equipmentNameFieldName);

  return (
    <FormSection borderless columns={1} isNested title={equipmentName}>
      <TextInput<SotwwCharacterData>
        label="Name"
        name={equipmentNameFieldName}
      />
      <TextAreaInput<SotwwCharacterData>
        label="Description"
        name={createEquipmentFieldName('equipment_description', index)}
      />
      {isEditMode && (
        <FlexBox justifyContent="flex-end">
          <DeleteButton onDelete={() => onDelete(index)} />
        </FlexBox>
      )}
    </FormSection>
  );
}
