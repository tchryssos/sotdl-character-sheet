import { Box } from '~/components/box/Box';
import { FlexBox } from '~/components/box/FlexBox';
import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { TextInput } from '~/components/form/TextInput';
import { WwnCharacterData } from '~/typings/wwn/characterData';

export function BasicInfoInputs() {
  return (
    <FormSection columns={1} title="Basic Info">
      <FlexBox flexDirection="column" gap={16}>
        <TextInput<WwnCharacterData> name="name" />
        <Box maxWidth="30%">
          <NumberInput<WwnCharacterData> max={10} min={0} name="level" />
        </Box>
      </FlexBox>
    </FormSection>
  );
}
