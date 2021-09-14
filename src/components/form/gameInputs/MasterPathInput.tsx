import startCase from 'lodash.startcase';
import { useContext, useEffect, useState } from 'react';

import {
  expertPathSelectOptions,
  FIELD_NAMES,
  masterPathSelectOptions,
  SECOND_EXPERT_PATH,
} from '~/constants/form';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { SelectInput } from '../SelectInput';
import { SelectOption } from '../typings';

const otherOption = {
  label: '-- Other --',
  value: 'other-ignore',
  disabled: true,
};

const masterPathOptions = [
  ...masterPathSelectOptions,
  otherOption,
  { label: startCase(SECOND_EXPERT_PATH), value: SECOND_EXPERT_PATH },
];

const secondExpertPathOptions = [
  ...expertPathSelectOptions,
  otherOption,
  {
    label: startCase(FIELD_NAMES.paths.master_path),
    value: FIELD_NAMES.paths.master_path,
  },
];

const disabledOptions = [{ label: '', value: '' }];

export const MasterPathInput = () => {
  const { watch, setValue } = useContext(ReactHookFormContext);
  const [options, setOptions] = useState<SelectOption[]>(disabledOptions);
  const [isSecondExpertPath, setIsSecondExpertPath] = useState(false);

  const level: number = watch?.(FIELD_NAMES.level, 0);
  const masterPath: string = watch?.(FIELD_NAMES.paths.master_path);

  const isMaster = level >= 7;

  useEffect(() => {
    if (masterPath === SECOND_EXPERT_PATH) {
      setOptions(secondExpertPathOptions);
      setIsSecondExpertPath(true);
      setValue(FIELD_NAMES.paths.master_path, expertPathSelectOptions[1]);
    } else if (masterPath === FIELD_NAMES.paths.master_path) {
      setOptions(masterPathOptions);
      setValue(FIELD_NAMES.paths.master_path, masterPathSelectOptions[1]);
      setIsSecondExpertPath(false);
    }
  }, [masterPath, setValue]);

  useEffect(() => {
    if (!isMaster) {
      setOptions(disabledOptions);
      setValue(FIELD_NAMES.paths.master_path, '');
    } else {
      setOptions(masterPathOptions);
    }
  }, [isMaster, setValue]);

  return (
    <SelectInput
      disabled={!isMaster}
      label={isSecondExpertPath ? 'Second Expert Path' : undefined}
      name={FIELD_NAMES.paths.master_path}
      options={options}
    />
  );
};
