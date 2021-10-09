import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FIELD_NAMES } from '~/constants/form';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';

import { NumberInput } from '../NumberInput';

export const PerceptionInput = () => {
  const { watch, setValue } = useFormContext();
  const isLessThanMd = useBreakpointsLessThan('md');

  const perception: number = watch(FIELD_NAMES.perception);

  useEffect(() => {
    setValue(FIELD_NAMES.perception_bonus, (perception ?? 0) - 10);
  }, [setValue, perception]);

  return (
    <>
      <NumberInput min={0} name={FIELD_NAMES.perception} />
      <NumberInput
        label={`${isLessThanMd ? '' : 'Per. '}Bonus`}
        name={FIELD_NAMES.perception_bonus}
        noOutline
      />
    </>
  );
};
