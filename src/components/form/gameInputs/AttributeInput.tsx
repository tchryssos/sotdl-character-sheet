import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FIELD_NAMES } from '~/constants/form';

import { GridBox } from '../../box/GridBox';
import { NumberInput } from '../NumberInput';
import { NumberInputProps } from '../typings';

type AttributeInputProps = Omit<NumberInputProps, 'type' | 'name'> & {
  name: keyof typeof FIELD_NAMES['attributes'];
};

export const AttributeInput: React.FC<AttributeInputProps> = ({ name }) => {
  const { watch, setValue } = useFormContext();
  const watchAttribute: number = watch(FIELD_NAMES.attributes[name]);

  useEffect(() => {
    setValue(FIELD_NAMES.attributeBonuses[name], (watchAttribute ?? 10) - 10);
  }, [watchAttribute, setValue, name]);

  return (
    <GridBox alignItems="end" columnGap={16}>
      <NumberInput max={20} min={1} name={name} />
      <NumberInput
        label="Bonus"
        name={FIELD_NAMES.attributeBonuses[name]}
        noOutline
      />
    </GridBox>
  );
};
