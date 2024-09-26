import { FlexBox } from '~/components/box/FlexBox';
import { FormSection } from '~/components/form/containers/FormSection';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { RpgIcons } from '~/constants/icons';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

export function CombatModifierInputs() {
  return (
    <FormSection
      columns={1}
      icon={RpgIcons.StackedSkulls}
      title="Combat Modifiers"
    >
      <FlexBox flexDirection="column" gap={16}>
        <TextInput<SotwwCharacterData> name="bonus_attack_damage" />
        <TextAreaInput<SotwwCharacterData> alwaysEditable name="conditions" />
      </FlexBox>
    </FormSection>
  );
}
