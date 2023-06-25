import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { RpgIcons } from '~/constants/icons';
import { WwnCharacterData } from '~/typings/wwn/characterData';

export function CurrencyInputs() {
  return (
    <FormSection columns={3} icon={RpgIcons.DollarCoin} title="Currency">
      <NumberInput<WwnCharacterData>
        alwaysEditable
        label="Copper"
        name="currency_copper"
      />
      <NumberInput<WwnCharacterData>
        alwaysEditable
        label="Silver"
        name="currency_silver"
      />
      <NumberInput<WwnCharacterData>
        alwaysEditable
        label="Gold"
        name="currency_gold"
      />
    </FormSection>
  );
}
