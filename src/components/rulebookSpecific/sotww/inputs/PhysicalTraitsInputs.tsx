import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSection } from '~/components/form/containers/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { RpgIcons } from '~/constants/icons';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

import { DefenseContext } from '../DefenseProvider';

export function PhysicalTraitsInputs() {
  const { recalculateDefense } = useContext(DefenseContext);
  const { watch } = useFormContext<SotwwCharacterData>();

  const naturalDefense = watch('defense_natural');

  useEffect(() => {
    recalculateDefense();
  }, [naturalDefense, recalculateDefense]);

  return (
    <FormSection columns={2} icon={RpgIcons.Foot} title="Physical Traits">
      <NumberInput<SotwwCharacterData> name="size" />
      <NumberInput<SotwwCharacterData> name="speed" />
      <NumberInput<SotwwCharacterData>
        label="Natural Defense"
        min={0}
        name="defense_natural"
      />
    </FormSection>
  );
}
