import styled from '@emotion/styled';
import { useContext, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { Button } from '~/components/Button';
import { Body } from '~/components/typography/Body';
import { FIELD_NAMES } from '~/constants/form';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { FormSection } from '../FormSection';
import { NumberInput } from '../NumberInput';
import { TextAreaInput } from '../TextAreaInput';
import { TextInput } from '../TextInput';

const AddAnotherButton = styled(Button)`
  max-width: ${({ theme }) => theme.spacing[128]};
`;

const ArmorCheckbox = styled.input`
  min-width: ${({ theme }) => theme.spacing[40]};
  min-height: ${({ theme }) => theme.spacing[40]};
  padding: 0;
  margin: 0;
`;

const defaultArmor = {
  [FIELD_NAMES.armors.defense]: 10,
  [FIELD_NAMES.armors.name]: '',
  [FIELD_NAMES.armors.notes]: '',
};

export const ArmorInput: React.FC = () => {
  const { control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: FIELD_NAMES.armors.fieldName,
  });
  const { setValue, watch } = useContext(ReactHookFormContext);

  const activeArmorIndex = watch?.(FIELD_NAMES.activeArmorIndex);

  useEffect(() => {
    if (append && setValue) {
      if (!fields.length) {
        append(defaultArmor);
      } else {
        setValue(FIELD_NAMES.armors.fieldName, fields);
      }
    }
  }, [fields, append, setValue]);

  const createOnArmorCheck = (index: number) => () => {
    const newVal = index === activeArmorIndex ? undefined : index;
    setValue(FIELD_NAMES.activeArmorIndex, newVal);
  };

  return (
    <FormSection columns={1} title="Armor">
      <AddAnotherButton
        label="Add New Armor"
        onClick={() => append(defaultArmor)}
      />
      <GridBox columns={3}>
        <GridBox gridTemplateColumns="1fr 7fr">
          <Body>Active</Body>
          <Body bold>Name</Body>
        </GridBox>
        <Body bold>Defense</Body>
        <Body bold>Notes</Body>
      </GridBox>
      {fields.map((field, i) => (
        <GridBox columns={3} key={field.id}>
          <GridBox gridTemplateColumns="1fr 7fr">
            <ArmorCheckbox
              checked={activeArmorIndex === i}
              name={FIELD_NAMES.activeArmorIndex}
              type="checkbox"
              onChange={createOnArmorCheck(i)}
            />
            <TextInput
              hideLabel
              name={`${FIELD_NAMES.armors.fieldName}.${i}.${FIELD_NAMES.armors.name}`}
            />
          </GridBox>
          <NumberInput
            hideLabel
            min={0}
            name={`${FIELD_NAMES.armors.fieldName}.${i}.${FIELD_NAMES.armors.defense}`}
          />
          <GridBox gridTemplateColumns="7fr 1fr">
            <TextAreaInput
              hideLabel
              name={`${FIELD_NAMES.armors.fieldName}.${i}.${FIELD_NAMES.armors.notes}`}
            />
            <Button label="Delete" onClick={() => remove(i)} />
          </GridBox>
        </GridBox>
      ))}
    </FormSection>
  );
};
