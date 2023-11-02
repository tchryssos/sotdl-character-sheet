import { Box } from '~/components/box/Box';
import { FlexBox } from '~/components/box/FlexBox';
import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { RpgIcons } from '~/constants/icons';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

export function BasicInfoInputs() {
  return (
    <FormSection columns={1} icon={RpgIcons.SinglePage} title="Basic Info">
      <FlexBox flexDirection="column" gap={16}>
        <TextInput<SotwwCharacterData> name="name" />
        <Box maxWidth="30%">
          <NumberInput<SotwwCharacterData> max={10} min={1} name="level" />
        </Box>
        <TextAreaInput<SotwwCharacterData> name="description" />
        <TextAreaInput<SotwwCharacterData> name="professions" />
      </FlexBox>
    </FormSection>
  );
}
