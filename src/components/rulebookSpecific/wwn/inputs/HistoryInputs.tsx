import { WwnCharacterData } from '~/typings/wwn/characterData';

import { FormSection } from '../../../form/FormSection';
import { TextAreaInput } from '../../../form/TextAreaInput';
import { TextInput } from '../../../form/TextInput';

export function HistoryInputs() {
  return (
    <FormSection columns={1} title="History">
      <TextInput<WwnCharacterData> name="ancestry" />
      <TextAreaInput<WwnCharacterData> name="description" />
      <TextAreaInput<WwnCharacterData> name="goal" />
    </FormSection>
  );
}
