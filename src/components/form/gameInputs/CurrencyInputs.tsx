import { FIELD_NAMES } from '~/constants/form';

import { FormSection } from '../FormSection';
import { NumberInput } from '../NumberInput';

export const CurrencyInputs: React.FC = () => (
  <FormSection columns={4} title="Currency">
    <NumberInput label="Gold" min={0} name={FIELD_NAMES.currency.gold} />
    <NumberInput label="Silver" min={0} name={FIELD_NAMES.currency.silver} />
    <NumberInput label="Copper" min={0} name={FIELD_NAMES.currency.copper} />
    <NumberInput label="Gems" min={0} name={FIELD_NAMES.currency.gems} />
  </FormSection>
);
