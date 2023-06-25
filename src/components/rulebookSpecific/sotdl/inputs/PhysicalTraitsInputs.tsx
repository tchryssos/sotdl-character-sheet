import { SotdlCharacterData } from '~/typings/sotdl/characterData';

import { BonusInput } from '../../../form/BonusInput';
import { FormSection } from '../../../form/FormSection';
import { NumberInput } from '../../../form/NumberInput';

const calcPerceptionBonus = (per: number) => per - 10;

export const PhysicalTraitsInputs: React.FC = () => (
  <FormSection title="Physical Traits">
    <BonusInput<SotdlCharacterData>
      bonusCalculationFn={calcPerceptionBonus}
      name="perception"
    />
    <NumberInput<SotdlCharacterData> min={0} name="speed" />
    <NumberInput<SotdlCharacterData> min={0.25} name="size" step={0.25} />
  </FormSection>
);
