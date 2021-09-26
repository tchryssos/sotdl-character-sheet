import { FIELD_NAMES } from '~/constants/form';

import { FormSection } from '../FormSection';
import { TextAreaInput } from '../TextAreaInput';

export const DescriptionInputs: React.FC = () => (
  <FormSection title="Description">
    <TextAreaInput name={FIELD_NAMES.background} />
    <TextAreaInput name={FIELD_NAMES.appearance} />
  </FormSection>
);
