import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/containers/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { WwnCharacterData, WwnEquipment } from '~/typings/wwn/characterData';

import { EncumbranceContext } from '../../EncumbranceProvider';

interface EquipmentInputItemProps {
  index: number;
  onDelete: (index: number) => void;
}

const createEquipmentFieldName = (
  name: keyof WwnEquipment,
  index: number
): `equipment.${number}.${keyof WwnEquipment}` => `equipment.${index}.${name}`;

export function EquipmentInputItem({
  index,
  onDelete,
}: EquipmentInputItemProps) {
  const { watch } = useFormContext<WwnCharacterData>();
  const isLessThanSm = useBreakpointsLessThan('sm');
  const { isEditMode } = useContext(EditContext);
  const { calculateEncumbrances } = useContext(EncumbranceContext);

  const equipmentNameFieldName = createEquipmentFieldName(
    'equipment_name',
    index
  );
  const equipmentName = watch(equipmentNameFieldName);

  const equipmentReadiedFieldName = createEquipmentFieldName(
    'equipment_readied',
    index
  );
  const equipmentReadied = watch(equipmentReadiedFieldName);

  const equipmentEncumbranceFieldName = createEquipmentFieldName(
    'equipment_encumbrance',
    index
  );
  const equipmentEncumbrance = watch(equipmentEncumbranceFieldName);

  useEffect(() => {
    calculateEncumbrances();
  }, [equipmentEncumbrance, equipmentReadied, calculateEncumbrances]);

  return (
    <FormSection
      borderless
      columns={1}
      isNested
      title={equipmentName as string}
      titleColor={equipmentReadied ? 'text' : 'textAccent'}
    >
      <GridBox gridTemplateColumns="auto 1fr">
        <CheckboxInput<WwnCharacterData>
          alwaysEditable
          label="Readied"
          name={equipmentReadiedFieldName}
        />
        <TextInput<WwnCharacterData>
          label="Name"
          name={equipmentNameFieldName}
        />
      </GridBox>
      <GridBox gridTemplateColumns={isLessThanSm ? '1fr' : '1fr min-content'}>
        <TextAreaInput<WwnCharacterData>
          label="Description"
          name={createEquipmentFieldName('equipment_description', index)}
        />
        <NumberInput<WwnCharacterData>
          label="Encumbrance"
          name={equipmentEncumbranceFieldName}
        />
      </GridBox>
      {isEditMode && <DeleteButton onDelete={() => onDelete(index)} />}
    </FormSection>
  );
}
