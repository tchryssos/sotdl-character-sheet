import { FormSection } from '~/components/form/containers/FormSection';
import { RpgIcons } from '~/constants/icons';

import { AcInput } from './AcInput';

export function DefensesInputs() {
  return (
    <FormSection columns={1} icon={RpgIcons.HeartShield} title="Defenses">
      <AcInput />
    </FormSection>
  );
}
