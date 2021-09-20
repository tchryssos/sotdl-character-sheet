import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { Body } from '~/components/typography/Body';
import { DEFAULT_VALUES, FIELD_NAMES } from '~/constants/form';
import { ArmorArray } from '~/typings/form';

import { FormSection } from '../FormSection';
import { NumberInput } from '../NumberInput';
import { TextAreaInput } from '../TextAreaInput';
import { TextInput } from '../TextInput';

export const ArmorInput: React.FC = () => {
  const { control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: FIELD_NAMES.armors.fieldName,
  });

  useEffect(() => {
    if (!fields.length) {
      append((DEFAULT_VALUES[FIELD_NAMES.armors.fieldName] as ArmorArray)[0]);
    }
  }, [fields, append]);

  return (
    <FormSection columns={1} title="Armor">
      <GridBox columns={3}>
        <Body bold>Name</Body>
        <Body bold>Defense</Body>
        <Body bold>Notes</Body>
      </GridBox>
      {fields.map((field, i) => (
        <GridBox columns={3} key={field.id}>
          <TextInput
            hideLabel
            name={`${FIELD_NAMES.armors.fieldName}.${i}.${FIELD_NAMES.armors.name}`}
          />
          <NumberInput
            hideLabel
            min={0}
            name={`${FIELD_NAMES.armors.fieldName}.${i}.${FIELD_NAMES.armors.defense}`}
          />
          <TextAreaInput
            hideLabel
            name={`${FIELD_NAMES.armors.fieldName}.${i}.${FIELD_NAMES.armors.notes}`}
          />
        </GridBox>
      ))}
    </FormSection>
  );
};
