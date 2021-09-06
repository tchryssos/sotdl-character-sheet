import { useContext, useEffect } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { FIELD_NAMES } from '~/constants/form';
import { BreakpointsContext } from '~/logic/contexts/breakpointsContext';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { NumberInput } from '../NumberInput';

export const PerceptionInput = () => {
  const { watch, setValue } = useContext(ReactHookFormContext);
  const breakpoints = useContext(BreakpointsContext);

  const smallerThanMd = !breakpoints.includes('md');

  const perception: number = watch?.(FIELD_NAMES.perception, 0);

  useEffect(() => {
    setValue(FIELD_NAMES.perception_bonus, perception - 10);
  }, [setValue, perception]);

  return (
    <GridBox>
      <NumberInput min={0} name={FIELD_NAMES.perception} />
      <NumberInput
        label={`${smallerThanMd ? '' : 'Per. '}Bonus`}
        name={FIELD_NAMES.perception_bonus}
        noOutline
      />
    </GridBox>
  );
};
