import { useContext, useEffect } from 'react';

import { FIELD_NAMES } from '~/constants/form';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';

import { NumberInput } from '../NumberInput';

export const HealthInputs = () => {
  const { watch, setValue } = useContext(ReactHookFormContext);

  const isLessThanMd = useBreakpointsLessThan('md');
  const health: number = watch?.(FIELD_NAMES.health, 0);

  useEffect(() => {
    setValue(FIELD_NAMES.healing_rate, Math.max(Math.floor(health / 4), 1));
  }, [health, setValue]);

  return (
    <>
      <NumberInput min={0} name={FIELD_NAMES.health} />
      <NumberInput
        label={isLessThanMd ? 'H. Rate' : 'Heal Rate'}
        min={1}
        name={FIELD_NAMES.healing_rate}
        noOutline
      />
      <NumberInput max={health} min={0} name={FIELD_NAMES.damage} />
      <NumberInput min={0} name={FIELD_NAMES.defense} />
    </>
  );
};
