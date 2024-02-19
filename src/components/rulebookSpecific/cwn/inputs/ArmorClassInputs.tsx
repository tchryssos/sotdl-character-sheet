import { FormSection } from '~/components/form/containers/FormSection';
import { Text } from '~/components/Text';
import { RpgIcons } from '~/constants/icons';

import { AcInput } from './AcInput';

export function ArmorClassInputs() {
  return (
    <FormSection columns={1} icon={RpgIcons.HeartShield} title="Armor Class">
      <Text as="p" variant="body-xs">
        Armor Class is automatically calculated based on your equipped armor and
        your Dexterity modifier.
      </Text>
      <AcInput />
    </FormSection>
  );
}
