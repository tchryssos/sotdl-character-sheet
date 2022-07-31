import { useFormContext } from 'react-hook-form';

import { SotdlCharacterData } from '~/typings/sotdl/characterData';

import { TextInput } from '../../../form/TextInput';

export const NovicePathInput = () => {
  const { watch } = useFormContext();
  const level: number = watch<keyof SotdlCharacterData>('level', 0);
  const isNovice = level >= 1;

  return (
    <TextInput<SotdlCharacterData> disabled={!isNovice} name="novice_path" />
  );
};
