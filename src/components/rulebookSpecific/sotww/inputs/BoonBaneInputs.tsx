import { FlexBox } from '~/components/box/FlexBox';
import { FormSection } from '~/components/form/containers/FormSection';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { RpgIcons } from '~/constants/icons';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

export function BoonBaneInputs() {
  return (
    <FormSection
      columns={1}
      icon={RpgIcons.HeartShield}
      title="Boons and Banes"
    >
      <FlexBox flexDirection="column" gap={16}>
        <TextAreaInput<SotwwCharacterData> name="boons_and_banes" />
      </FlexBox>
    </FormSection>
  );
}
