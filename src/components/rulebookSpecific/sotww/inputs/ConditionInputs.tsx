import { FlexBox } from '~/components/box/FlexBox';
import { FormSection } from '~/components/form/containers/FormSection';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { RpgIcons } from '~/constants/icons';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

export function ConditionInputs() {
  return (
    <FormSection columns={1} icon={RpgIcons.StackedSkulls} title="Conditions">
      <FlexBox flexDirection="column" gap={16}>
        <TextAreaInput<SotwwCharacterData> name="conditions" />
      </FlexBox>
    </FormSection>
  );
}
