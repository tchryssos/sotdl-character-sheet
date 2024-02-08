import { FormSection } from '~/components/form/containers/FormSection';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { RpgIcons } from '~/constants/icons';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

export function BackgroundInputs() {
  return (
    <FormSection columns={1} icon={RpgIcons.BookmarkBook} title="Background">
      <TextInput<SotwwCharacterData> name="ancestry" />
      <TextAreaInput<SotwwCharacterData> name="ancestry_traits" />
    </FormSection>
  );
}
