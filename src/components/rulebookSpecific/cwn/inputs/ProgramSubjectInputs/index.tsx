import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/containers/FormSection';
import { RpgIcons } from '~/constants/icons';
import {
  CwnCharacterData,
  CwnProgramSubject,
} from '~/typings/cwn/characterData';

import { ProgramSubjectInputItem } from './ProgramSubjectInputItem';

const createDefaultValue = (): CwnProgramSubject => ({
  name: '',
  subject_type: 'device',
  description: '',
});

export function ProgramSubjectInputs() {
  return (
    <FormSection columns={1} icon={RpgIcons.Eye} title="Program Subjects">
      <AddAnotherMultiField<CwnCharacterData>
        createDefaultValue={createDefaultValue}
        parentFieldName="program_subjects"
      >
        {({ fieldId, index, onDelete }) => (
          <ProgramSubjectInputItem
            key={fieldId}
            postSortIndex={index}
            onDelete={onDelete}
          />
        )}
      </AddAnotherMultiField>
    </FormSection>
  );
}
