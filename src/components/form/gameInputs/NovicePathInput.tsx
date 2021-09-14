import startCase from 'lodash.startcase';
import { useContext } from 'react';

import { FIELD_NAMES } from '~/constants/form';
import { NOVICE_PATHS } from '~/constants/game';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { SelectInput } from '../SelectInput';

const novicePathOptions = NOVICE_PATHS.map((p) => ({
  label: startCase(p),
  value: p,
}));

export const NovicePathInput = () => {
  const { watch } = useContext(ReactHookFormContext);
  const level: number = watch?.(FIELD_NAMES.level, 0);
  const isNovice = level >= 1;

  return (
    <SelectInput
      disabled={!isNovice}
      name={FIELD_NAMES.paths.novice_path}
      options={isNovice ? novicePathOptions : [{ label: '', value: '' }]}
    />
  );
};
