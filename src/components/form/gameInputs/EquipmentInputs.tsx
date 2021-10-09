import { useContext } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { Body } from '~/components/typography/Body';
import { FIELD_NAMES } from '~/constants/form';
import { EditContext } from '~/logic/contexts/editContext';

import { AddAnotherMultiField } from '../AddAnotherMultiField';
import { FormSection } from '../FormSection';
import { TextAreaInput } from '../TextAreaInput';
import { TextInput } from '../TextInput';

interface ItemFieldProps {
  index: number;
  onDelete: (index: number) => void;
}

const itemTemplateColumns = '4fr 1fr 6fr';
const { fieldName, name, notes, value } = FIELD_NAMES.equipment;

const ItemField: React.FC<ItemFieldProps> = ({ index, onDelete }) => {
  const isEditMode = useContext(EditContext);
  return (
    <GridBox gridTemplateColumns={itemTemplateColumns}>
      <TextInput hideLabel name={`${fieldName}.${index}.${name}}`} />
      <TextInput hideLabel name={`${fieldName}.${index}.${value}`} />
      <GridBox gridTemplateColumns={isEditMode ? '1fr auto' : '1fr'}>
        <TextAreaInput hideLabel name={`${fieldName}.${index}.${notes}`} />
        {isEditMode && <DeleteButton onDelete={() => onDelete(index)} />}
      </GridBox>
    </GridBox>
  );
};

const ItemHeader: React.FC = () => (
  <GridBox gridTemplateColumns={itemTemplateColumns}>
    <Body bold>Name</Body>
    <Body bold>Value</Body>
    <Body bold>Notes</Body>
  </GridBox>
);

export const EquipmentInputs: React.FC = () => (
  <FormSection columns={1} title="Equipment">
    <AddAnotherMultiField
      HeaderRow={ItemHeader}
      parentFieldName={FIELD_NAMES.equipment.fieldName}
    >
      {({ index, onDelete }) => <ItemField index={index} onDelete={onDelete} />}
    </AddAnotherMultiField>
  </FormSection>
);
