import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/containers/FormSection';
import { RpgIcons } from '~/constants/icons';
import { CwnCharacterData } from '~/typings/cwn/characterData';

import { MajorInjuriesInput } from './MajorInjuriesInput';

export function InjuryInputs() {
  return (
    <FormSection columns={1} icon={RpgIcons.BoneLg} title="Injuries">
      <CheckboxInput<CwnCharacterData>
        label="Traumatic Hit"
        name="traumatic_hit"
      />
      <MajorInjuriesInput />
    </FormSection>
  );
}
