import { SotdlCharacterData } from '~/typings/sotdl/characterData';

import { FormSection } from '../../../form/containers/FormSection';
import { NumberInput } from '../../../form/NumberInput';

export function CurrencyInputs() {
  return (
    <FormSection columns={3} isCollapsible title="Currency">
      <NumberInput<SotdlCharacterData>
        label="Gold"
        min={0}
        name="currency_gold"
      />
      <NumberInput<SotdlCharacterData>
        label="Silver"
        min={0}
        name="currency_silver"
      />
      <NumberInput<SotdlCharacterData>
        label="Copper"
        min={0}
        name="currency_copper"
      />
    </FormSection>
  );
}
