import { FormSection } from '~/components/form/containers/FormSection';
import { RpgIcons } from '~/constants/icons';

export function DefensesInputs() {
  return (
    <FormSection columns={1} icon={RpgIcons.HeartShield} title="Defenses">
      <div>
        <div>defenses</div>
      </div>
    </FormSection>
  );
}
