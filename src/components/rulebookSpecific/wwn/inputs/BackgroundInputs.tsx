import { FlexBox } from '~/components/box/FlexBox';
import { FormSection } from '~/components/form/FormSection';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { WwnCharacterData } from '~/typings/wwn/characterData';

export function BackgroundInputs() {
  return (
    <FormSection columns={1} title="Background">
      <FlexBox flexDirection="column" gap={16}>
        <TextInput<WwnCharacterData>
          label="Background"
          name="background_name"
        />
        <TextAreaInput<WwnCharacterData> name="background_details" />
      </FlexBox>
    </FormSection>
  );
}
