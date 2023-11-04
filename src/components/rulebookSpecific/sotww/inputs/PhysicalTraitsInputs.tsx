import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { RpgIcons } from '~/constants/icons';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

export function PhysicalTraitsInputs() {
  return (
    <FormSection columns={2} icon={RpgIcons.Foot} title="Physical Traits">
      <NumberInput<SotwwCharacterData> name="size" />
      <NumberInput<SotwwCharacterData> name="speed" />
      <NumberInput<SotwwCharacterData> min={0} name="defense_natural" />
    </FormSection>
  );
}
