import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { NumberInput } from '~/components/form/NumberInput';
import { CwnCharacterData } from '~/typings/cwn/characterData';

import { AcContext } from '../AcProvider';

export function AcInput() {
  const { rangedAc, meleeAc } = useContext(AcContext);
  const { setValue } = useFormContext<CwnCharacterData>();

  useEffect(() => {
    setValue('armor_class_ranged', rangedAc);
  }, [rangedAc, setValue]);

  useEffect(() => {
    setValue('armor_class_melee', meleeAc);
  }, [meleeAc, setValue]);

  return (
    <FlexBox flexDirection="column" gap={4}>
      <GridBox columns={2}>
        <NumberInput<CwnCharacterData> name="armor_class_melee" readOnly />
        <NumberInput<CwnCharacterData> name="armor_class_ranged" readOnly />
      </GridBox>
    </FlexBox>
  );
}
