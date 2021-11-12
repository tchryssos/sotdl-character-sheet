import styled from '@emotion/styled';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { SubBody } from '~/components/typography/SubBody';
import { FIELD_NAMES } from '~/constants/form';
import { EditContext } from '~/logic/contexts/editContext';

import { AddAnotherMultiField } from '../AddAnotherMultiField';
import { FormSection } from '../FormSection';
import { NumberInput } from '../NumberInput';
import { TextAreaInput } from '../TextAreaInput';
import { TextInput } from '../TextInput';

const ArmorCheckbox = styled.input`
  min-width: ${({ theme }) => theme.spacing[40]};
  min-height: ${({ theme }) => theme.spacing[40]};
  padding: 0;
  margin: 0;
`;

// Something about setValue is overwriting defaultArmor
// if it is set as a constant, so I am setting it to a fn
// that returns the obj, which fixes the problem
const createDefaultArmor = () => ({
  [FIELD_NAMES.armors.defense]: 0,
  [FIELD_NAMES.armors.name]: '',
  [FIELD_NAMES.armors.notes]: '',
});

const armorTemplateColums = '4fr 1fr 4fr';

interface ArmorFieldProps {
  index: number;
  onDelete: (index: number) => void;
}

const ArmorField: React.FC<ArmorFieldProps> = ({ index, onDelete }) => {
  const { setValue, watch } = useFormContext();
  const { isEditMode } = useContext(EditContext);

  const activeArmorIndex: number | undefined = watch(
    FIELD_NAMES.activeArmorIndex
  );

  const onArmorCheck = () => {
    const newVal = index === activeArmorIndex ? undefined : index;
    setValue(FIELD_NAMES.activeArmorIndex, newVal);
  };

  return (
    <GridBox columns={3} gridTemplateColumns={armorTemplateColums}>
      <GridBox gridTemplateColumns="auto 1fr">
        <ArmorCheckbox
          checked={activeArmorIndex === index}
          name={FIELD_NAMES.activeArmorIndex}
          type="checkbox"
          onChange={onArmorCheck}
        />
        <TextInput
          hideLabel
          name={`${FIELD_NAMES.armors.fieldName}.${index}.${FIELD_NAMES.armors.name}`}
        />
      </GridBox>
      <NumberInput
        hideLabel
        min={0}
        name={`${FIELD_NAMES.armors.fieldName}.${index}.${FIELD_NAMES.armors.defense}`}
      />
      <GridBox gridTemplateColumns={isEditMode ? '7fr 1fr' : '1fr'}>
        <TextAreaInput
          hideLabel
          name={`${FIELD_NAMES.armors.fieldName}.${index}.${FIELD_NAMES.armors.notes}`}
        />
        {isEditMode && <DeleteButton onDelete={() => onDelete(index)} />}
      </GridBox>
    </GridBox>
  );
};

const HeaderRow: React.FC = () => (
  <GridBox columns={3} gridTemplateColumns={armorTemplateColums}>
    <GridBox gridTemplateColumns="1fr 7fr">
      <SubBody>Active</SubBody>
      <SubBody bold>Name</SubBody>
    </GridBox>
    <SubBody bold>Defense</SubBody>
    <SubBody bold>Notes</SubBody>
  </GridBox>
);

export const ArmorInput: React.FC = () => (
  <FormSection columns={1} isCollapsable title="Armor">
    <AddAnotherMultiField
      HeaderRow={HeaderRow}
      createDefaultValue={createDefaultArmor}
      parentFieldName={FIELD_NAMES.armors.fieldName}
    >
      {({ index, onDelete }) => (
        <ArmorField index={index} onDelete={onDelete} />
      )}
    </AddAnotherMultiField>
  </FormSection>
);
