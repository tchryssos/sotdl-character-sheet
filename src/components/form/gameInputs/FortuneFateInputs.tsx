import { useContext } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { FIELD_NAMES } from '~/constants/form';
import { BreakpointsContext } from '~/logic/contexts/breakpointsContext';

import { CheckboxInput } from '../CheckboxInput';
import { NumberInput } from '../NumberInput';

export const FortuneFateInputs: React.FC = () => {
  const breakpoints = useContext(BreakpointsContext);
  const lessThanMd = !breakpoints.includes('md');

  return (
    <>
      <NumberInput
        label={lessThanMd ? 'Fate' : 'Fate Rolls'}
        max={3}
        min={0}
        name={FIELD_NAMES.fateRolls}
      />
      <CheckboxInput name={FIELD_NAMES.fortune} />
    </>
  );
};
