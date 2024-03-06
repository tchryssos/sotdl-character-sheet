import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/containers/FormSection';
import { RpgIcons } from '~/constants/icons';
import { CwnCharacterData, CwnCyberdeck } from '~/typings/cwn/characterData';

import { CyberdeckInputItem } from './CyberdeckInputItem';

const createDefaultValue = (): CwnCyberdeck => ({
  name: '',
  bonus_access: 1,
  memory: 10,
  shielding: 10,
  cpu: 3,
  encumbrance: 1,
  readied: true,
  description: '',
});

export function CyberdeckInputs() {
  return (
    <FormSection columns={1} icon={RpgIcons.IdCard} title="Cyberdeck">
      <AddAnotherMultiField<CwnCharacterData>
        createDefaultValue={createDefaultValue}
        parentFieldName="cyberdecks"
      >
        {({ onDelete, index, fieldId }) => (
          <CyberdeckInputItem
            key={fieldId}
            postSortIndex={index}
            onDelete={onDelete}
          />
        )}
      </AddAnotherMultiField>
    </FormSection>
  );
}
