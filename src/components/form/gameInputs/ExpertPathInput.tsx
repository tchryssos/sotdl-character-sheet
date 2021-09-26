import { useContext } from 'react';

import { FIELD_NAMES } from '~/constants/form';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { TextInput } from '../TextInput';

export const ExpertPathInput = () => {
  const { watch } = useContext(ReactHookFormContext);
  const level: number = watch?.(FIELD_NAMES.level, 0);
  const isExpert = level >= 3;

  return (
    <TextInput disabled={!isExpert} name={FIELD_NAMES.paths.expert_path} />
  );
};
