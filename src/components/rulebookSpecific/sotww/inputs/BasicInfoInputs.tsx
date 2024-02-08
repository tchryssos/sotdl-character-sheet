import { Box } from '~/components/box/Box';
import { FlexBox } from '~/components/box/FlexBox';
import { FormSection } from '~/components/form/containers/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { RpgIcons } from '~/constants/icons';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

export function BasicInfoInputs() {
  const isLessThanXs = useBreakpointsLessThan('xs');
  return (
    <FormSection columns={1} icon={RpgIcons.SinglePage} title="Basic Info">
      <FlexBox flexDirection="column" gap={16}>
        <TextInput<SotwwCharacterData> name="name" />
        <Box maxWidth="30%">
          <NumberInput<SotwwCharacterData> max={10} min={1} name="level" />
        </Box>
        <TextAreaInput<SotwwCharacterData> name="description" />
        <FlexBox flexDirection={isLessThanXs ? 'column' : 'row'} gap={16}>
          <TextAreaInput<SotwwCharacterData> name="languages" />
          <TextAreaInput<SotwwCharacterData> name="professions" />
        </FlexBox>
      </FlexBox>
    </FormSection>
  );
}
