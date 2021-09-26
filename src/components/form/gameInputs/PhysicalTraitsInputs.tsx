import { FIELD_NAMES } from '~/constants/form';

import { FormSection } from '../FormSection';
import { NumberInput } from '../NumberInput';
import { PerceptionInput } from './PerceptionInput';

export const PhysicalTraitsInputs: React.FC = () => (
  <FormSection title="Physical Traits">
    <PerceptionInput />
    <NumberInput min={0} name={FIELD_NAMES.speed} />
    <NumberInput min={0.25} name={FIELD_NAMES.size} step={0.25} />
  </FormSection>
);
