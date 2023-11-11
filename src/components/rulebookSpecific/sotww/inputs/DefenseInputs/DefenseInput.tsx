import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { NumberInput } from '~/components/form/NumberInput';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

import { DefenseContext } from '../../DefenseProvider';

export function DefenseInput() {
  const { setValue } = useFormContext<SotwwCharacterData>();
  const { totalDefense } = useContext(DefenseContext);

  useEffect(() => {
    setValue('defense', totalDefense);
  }, [totalDefense, setValue]);

  return <NumberInput<SotwwCharacterData> name="defense" readOnly />;
}
