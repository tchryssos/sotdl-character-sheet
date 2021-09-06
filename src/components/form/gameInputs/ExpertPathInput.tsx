import { useContext } from 'react';

import { expertPathSelectOptions, FIELD_NAMES } from '~/constants/form';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { SelectInput } from '../SelectInput';

export const ExpertPathInput = () => {
  const { watch } = useContext(ReactHookFormContext);
  const level: number = watch?.(FIELD_NAMES.level, 0);
  const isExpert = level >= 3;

  return (
    <SelectInput
      disabled={!isExpert}
      name={FIELD_NAMES.paths.expert_path}
      options={isExpert ? expertPathSelectOptions : [{ label: '', value: '' }]}
    />
  );
};
