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
  const damage: number = watch?.(FIELD_NAMES.damage, 0);
  const health: number = watch?.(FIELD_NAMES.health, 0);

  useEffect(() => {
    setValue(FIELD_NAMES.healing_rate, Math.max(health / 4, 1));
  }, [health, setValue]);
  return (
    <GridBox columnGap={16}>
      <NumberInput min={0} name={FIELD_NAMES.health} />
      <NumberInput
        label={smallerThanMd ? 'H. Rate' : 'Heal Rate'}
        min={1}
        name={FIELD_NAMES.healing_rate}
        noOutline
        step={0.01}
      />
      <NumberInput min={0} name={FIELD_NAMES.damage} step={0.01} />
      <NumberInput min={0} name={FIELD_NAMES.defense} />
    </GridBox>
  );
};
