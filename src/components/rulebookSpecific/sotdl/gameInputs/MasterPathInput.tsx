import { useFormContext } from 'react-hook-form';

import { SotdlCharacterData } from '~/typings/sotdl/characterData';

import { TextInput } from '../../../form/TextInput';

export const MasterPathInput = () => {
  const { watch } = useFormContext();

  const level: number = watch<keyof SotdlCharacterData>('level', 0);

  const isMaster = level >= 7;

  return (
    <TextInput<SotdlCharacterData> disabled={!isMaster} name="master_path" />
  );
};
