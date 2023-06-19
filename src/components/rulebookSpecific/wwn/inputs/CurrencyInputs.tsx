import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { RpgIcons } from '~/constants/icons';
import { WwnCharacterData } from '~/typings/wwn/characterData';

export function CurrencyInputs() {
  return (
    <FormSection columns={3} icon={RpgIcons.DollarCoin} title="Currency">
      <NumberInput<WwnCharacterData> label="Copper" name="currency_copper" />
      <NumberInput<WwnCharacterData> label="Silver" name="currency_silver" />
      <NumberInput<WwnCharacterData> label="Gold" name="currency_gold" />
    </FormSection>
  );
}
