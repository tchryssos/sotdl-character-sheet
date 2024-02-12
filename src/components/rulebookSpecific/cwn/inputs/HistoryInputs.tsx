import { FormSection } from '~/components/form/containers/FormSection';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { RpgIcons } from '~/constants/icons';
import { CwnCharacterData } from '~/typings/cwn/characterData';

export function HistoryInputs() {
  return (
    <FormSection columns={1} icon={RpgIcons.BookmarkBook} title="History">
      <TextInput<CwnCharacterData> label="Background" name="background_name" />
      <TextAreaInput<CwnCharacterData> name="background_details" />
      <TextAreaInput<CwnCharacterData> name="goal" />
      <TextAreaInput<CwnCharacterData> name="ties" />
    </FormSection>
  );
}
