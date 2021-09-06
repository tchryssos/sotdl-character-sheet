import styled from '@emotion/styled';
import { useContext, useEffect } from 'react';

import { FIELD_NAMES } from '~/constants/form';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { GridBox } from '../../box/GridBox';
import { NumberInput } from '../NumberInput';
import { NumberInputProps } from '../typings';

type AttributeInputProps = Omit<NumberInputProps, 'type' | 'name'> & {
  name: keyof typeof FIELD_NAMES['attributes'];
};

export const AttributeInput: React.FC<AttributeInputProps> = ({ name }) => {
  const { watch, setValue } = useContext(ReactHookFormContext);
  const watchAttribute: number = watch?.(FIELD_NAMES.attributes[name], 10);

  useEffect(() => {
    setValue?.(FIELD_NAMES.attributeBonuses[name], watchAttribute - 10);
  }, [watchAttribute, setValue, name]);

  return (
    <GridBox alignItems="end" columnGap={16}>
      <NumberInput max={20} min={1} name={name} />
      <NumberInput
        label="Bonus"
        name={FIELD_NAMES.attributeBonuses[name]}
        noOutline
        readOnly
      />
    </GridBox>
  );
};
