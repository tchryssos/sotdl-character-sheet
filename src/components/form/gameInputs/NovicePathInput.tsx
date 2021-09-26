import { useContext } from 'react';

import { FIELD_NAMES } from '~/constants/form';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { TextInput } from '../TextInput';

export const NovicePathInput = () => {
  const { watch } = useContext(ReactHookFormContext);
  const level: number = watch?.(FIELD_NAMES.level, 0);
  const isNovice = level >= 1;

  return (
    <TextInput disabled={!isNovice} name={FIELD_NAMES.paths.novice_path} />
  );
};
