import styled from '@emotion/styled';
import { useContext, useEffect } from 'react';

import { FIELD_NAMES } from '~/constants/form';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { FlexBox } from '../box/FlexBox';
import { GridBox } from '../box/GridBox';
import { Body } from '../typography/Body';
import { NumberInput } from './NumberInput';
import { NumberInputProps } from './typings';

type AttributeInputProps = Omit<NumberInputProps, 'type' | 'name'> & {
  name: keyof typeof FIELD_NAMES['attributes'];
};

const Mod = styled(NumberInput)`
  border-color: transparent;
  outline-color: transparent;
  padding-left: 0;
`;

const ModSymbol = styled(Body)`
  padding-bottom: 0.375rem;
`;

export const AttributeInput: React.FC<AttributeInputProps> = ({ name }) => {
  const { watch, setValue } = useContext(ReactHookFormContext);
  const watchAttribute: number = watch?.(FIELD_NAMES.attributes[name], 10);
  const watchMod: number = watch?.(FIELD_NAMES.attributeModifiers[name]);

  useEffect(() => {
    setValue?.(FIELD_NAMES.attributeModifiers[name], watchAttribute - 10);
  }, [watchAttribute, setValue, name]);

  return (
    <GridBox alignItems="end" columnGap={16}>
      <NumberInput max={20} min={1} name={name} />
      <FlexBox alignItems="center">
        <ModSymbol>{watchMod >= 0 ? '+' : ''}</ModSymbol>
        <Mod hideLabel name={FIELD_NAMES.attributeModifiers[name]} readOnly />
      </FlexBox>
    </GridBox>
  );
};
