import { GridBox } from '~/components/box/GridBox';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/containers/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { RpgIcons } from '~/constants/icons';
import { CwnCharacterData } from '~/typings/cwn/characterData';

import { MajorInjuriesInput } from './MajorInjuriesInput';

export function InjuryInputs() {
  return (
    <FormSection columns={1} icon={RpgIcons.BoneLg} title="Injuries">
      <GridBox>
        <CheckboxInput<CwnCharacterData>
          alwaysEditable
          label="Traumatic Hit"
          name="traumatic_hit"
        />
        <NumberInput<CwnCharacterData> min={0} name="trauma_target" />
      </GridBox>
      <MajorInjuriesInput />
    </FormSection>
  );
}
