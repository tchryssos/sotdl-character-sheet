import { useContext, useEffect } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { FIELD_NAMES } from '~/constants/form';
import { BreakpointsContext } from '~/logic/contexts/breakpointsContext';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { NumberInput } from '../NumberInput';

export const HealthInputs = () => {
  const { watch, setValue } = useContext(ReactHookFormContext);
  const breakpoints = useContext(BreakpointsContext);

  const smallerThanMd = !breakpoints.includes('md');
  const health: number = watch?.(FIELD_NAMES.health, 0);

  useEffect(() => {
    setValue(FIELD_NAMES.healing_rate, Math.max(Math.floor(health / 4), 1));
  }, [health, setValue]);

  return (
    <GridBox columnGap={16}>
      <NumberInput min={0} name={FIELD_NAMES.health} />
      <NumberInput
        label={smallerThanMd ? 'H. Rate' : 'Heal Rate'}
        min={1}
        name={FIELD_NAMES.healing_rate}
        noOutline
      />
      <NumberInput max={health} min={0} name={FIELD_NAMES.damage} />
      <NumberInput min={0} name={FIELD_NAMES.defense} />
    </GridBox>
  );
};
