import { Box } from '~/components/box/Box';
import { FlexBox } from '~/components/box/FlexBox';
import { FormSection } from '~/components/form/containers/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { RpgIcons } from '~/constants/icons';
import { CwnCharacterData } from '~/typings/cwn/characterData';

export function BasicInfoInputs() {
  return (
    <FormSection columns={1} icon={RpgIcons.SinglePage} title="Basic Info">
      <FlexBox flexDirection="column" gap={16}>
        <TextInput<CwnCharacterData> name="name" />
        <Box maxWidth="30%">
          <NumberInput<CwnCharacterData> max={10} min={0} name="level" />
        </Box>
        <TextAreaInput<CwnCharacterData> name="description" />
        <TextAreaInput<CwnCharacterData> name="goal" />
      </FlexBox>
    </FormSection>
  );
}
