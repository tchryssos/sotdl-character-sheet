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

const Mod = styled(NumberInput)`
  border-color: transparent;
  outline-color: transparent;
  padding-left: 0;
`;

export const AttributeInput: React.FC<AttributeInputProps> = ({ name }) => {
  const { watch, setValue } = useContext(ReactHookFormContext);
  const watchAttribute: number = watch?.(FIELD_NAMES.attributes[name], 10);

  useEffect(() => {
    setValue?.(FIELD_NAMES.attributeModifiers[name], watchAttribute - 10);
  }, [watchAttribute, setValue, name]);

  return (
    <GridBox alignItems="end" columnGap={16}>
      <NumberInput max={20} min={1} name={name} />
      <Mod label="Bonus" name={FIELD_NAMES.attributeModifiers[name]} readOnly />
    </GridBox>
  );
};
