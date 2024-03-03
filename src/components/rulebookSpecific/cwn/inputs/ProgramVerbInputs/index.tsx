import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/containers/FormSection';
import { RpgIcons } from '~/constants/icons';
import { CwnCharacterData, CwnProgramVerb } from '~/typings/cwn/characterData';

import { ProgramVerbInputItem } from './ProgramVerbInputItem';

// import { ProgramSubjectInputItem } from './ProgramSubjectInputItem';

const createDefaultValue = (): CwnProgramVerb => ({
  name: '',
  target_types: [],
  access_cost: 1,
  skill_check_mod: 1,
  use: '',
});

export function ProgramVerbInputs() {
  return (
    <FormSection columns={1} icon={RpgIcons.TongueMouth} title="Program Verbs">
      <AddAnotherMultiField<CwnCharacterData>
        createDefaultValue={createDefaultValue}
        parentFieldName="program_verbs"
      >
        {({ fieldId, index, onDelete }) => (
          <ProgramVerbInputItem
            key={fieldId}
            postSortIndex={index}
            onDelete={onDelete}
          />
        )}
      </AddAnotherMultiField>
    </FormSection>
  );
}
