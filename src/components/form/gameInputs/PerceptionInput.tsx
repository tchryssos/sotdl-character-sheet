import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FIELD_NAMES } from '~/constants/form';

import { NumberInput } from '../NumberInput';

export const PerceptionInput = () => {
  const { watch, setValue } = useFormContext();

  let perception: number = watch(FIELD_NAMES.perception);
  perception = parseInt(`${perception || 10}`, 10);

  useEffect(() => {
    setValue(FIELD_NAMES.perception_bonus, perception - 10);
  }, [setValue, perception]);

  return (
    <>
      <NumberInput min={0} name={FIELD_NAMES.perception} />
      <NumberInput
        label="Bonus"
        name={FIELD_NAMES.perception_bonus}
        noOutline
      />
    </>
  );
};
