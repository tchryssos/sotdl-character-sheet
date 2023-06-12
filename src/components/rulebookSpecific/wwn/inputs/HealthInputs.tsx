import { useFormContext } from 'react-hook-form';

import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { RpgIcons } from '~/constants/icons';
import { WwnCharacterData } from '~/typings/wwn/characterData';

export function HealthInputs() {
  const { watch } = useFormContext();

  const constitution = watch<keyof WwnCharacterData>('attribute_constitution');
  return (
    <FormSection icon={RpgIcons.HeartGuy} title="Health">
      <NumberInput<WwnCharacterData> min={0} name="health_max" />
      <NumberInput<WwnCharacterData> name="health_current" />
      <NumberInput<WwnCharacterData>
        max={constitution || 18}
        min={0}
        name="system_strain"
      />
    </FormSection>
  );
}
