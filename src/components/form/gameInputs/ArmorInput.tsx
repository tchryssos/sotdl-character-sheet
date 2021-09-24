import styled from '@emotion/styled';
import { useContext, useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { Button } from '~/components/Button';
import { Body } from '~/components/typography/Body';
import { FIELD_NAMES } from '~/constants/form';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';
import { ArmorArray } from '~/typings/form';

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

interface ArmorFieldProps {
  index: number;
  remove: (index: number) => void;
}

const ArmorField: React.FC<ArmorFieldProps> = ({ index, remove }) => {
  const { setValue, watch } = useContext(ReactHookFormContext);

  const activeArmorIndex: number | undefined = watch?.(
    FIELD_NAMES.activeArmorIndex
  );

  const createOnArmorCheck = () => {
    const newVal = index === activeArmorIndex ? undefined : index;
    setValue(FIELD_NAMES.activeArmorIndex, newVal);
  };

  return (
    <GridBox columns={3}>
      <GridBox gridTemplateColumns="1fr 7fr">
        <ArmorCheckbox
          checked={activeArmorIndex === index}
          name={FIELD_NAMES.activeArmorIndex}
          type="checkbox"
          onChange={createOnArmorCheck}
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
      <GridBox gridTemplateColumns="7fr 1fr">
        <TextAreaInput
          hideLabel
          name={`${FIELD_NAMES.armors.fieldName}.${index}.${FIELD_NAMES.armors.notes}`}
        />
        <Button
          label="X"
          onClick={() => {
            setValue(FIELD_NAMES.armors.fieldName);
            remove(index);
          }}
        />
      </GridBox>
    </GridBox>
  );
};

export const ArmorInput: React.FC = () => {
  const { control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: FIELD_NAMES.armors.fieldName,
  });
  const { watch } = useContext(ReactHookFormContext);

  const armors: ArmorArray | undefined = watch?.(FIELD_NAMES.armors.fieldName);

  const controlledFields = fields.map((field, i) => ({
    ...field,
    ...armors?.[i],
  }));

  return (
    <FormSection columns={1} title="Armor">
      <AddAnotherButton label="+" onClick={() => append(defaultArmor)} />
      {Boolean(controlledFields?.length) && (
        <GridBox columns={3}>
          <GridBox gridTemplateColumns="1fr 7fr">
            <Body>Active</Body>
            <Body bold>Name</Body>
          </GridBox>
          <Body bold>Defense</Body>
          <Body bold>Notes</Body>
        </GridBox>
      )}
      {controlledFields.map((field, i) => (
        <ArmorField index={i} key={field.id} remove={remove} />
      ))}
    </FormSection>
  );
};
