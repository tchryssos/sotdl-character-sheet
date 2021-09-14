import { useContext } from 'react';

import { FIELD_NAMES } from '~/constants/form';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { NumberInput } from '../NumberInput';

export const EvilInputs: React.FC = () => {
  const { watch } = useContext(ReactHookFormContext);
  const will: number = watch?.(FIELD_NAMES.attributes.will, 0);

  return (
    <>
      <NumberInput max={will} min={0} name={FIELD_NAMES.insanity} />
      <NumberInput min={0} name={FIELD_NAMES.corruption} />
    </>
  );
};
