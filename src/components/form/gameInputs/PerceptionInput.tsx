import { useContext, useEffect } from 'react';

import { FIELD_NAMES } from '~/constants/form';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';

import { NumberInput } from '../NumberInput';

export const PerceptionInput = () => {
  const { watch, setValue } = useContext(ReactHookFormContext);
  const isLessThanMd = useBreakpointsLessThan('md');

  const perception: number = watch?.(FIELD_NAMES.perception, 0);

  useEffect(() => {
    setValue(FIELD_NAMES.perception_bonus, perception - 10);
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
