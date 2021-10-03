import { FIELD_NAMES } from '~/constants/form';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';

import { FormSection } from '../FormSection';
import { TextAreaInput } from '../TextAreaInput';

export const DescriptionInputs: React.FC = () => {
  const isLessThanXs = useBreakpointsLessThan('xs');
  return (
    <FormSection
      columns={isLessThanXs ? 1 : 2}
      isCollapsable
      title="Description"
    >
      <TextAreaInput name={FIELD_NAMES.background} />
      <TextAreaInput name={FIELD_NAMES.appearance} />
    </FormSection>
  );
};
