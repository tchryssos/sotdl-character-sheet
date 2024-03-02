import { v4 as uuid4 } from 'uuid';

import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/containers/FormSection';
import { RpgIcons } from '~/constants/icons';
import { CwnCharacterData, CwnCyberware } from '~/typings/cwn/characterData';

import { CyberwareInputItem } from './CyberwareInputItem';

const createDefaultValue = (): CwnCyberware => ({
  name: '',
  description: '',
  concealment: 'touch',
  type: 'body',
  system_strain: 0.25,
  effect: '',
  id: uuid4(),
  as: null,
});

export function CyberwaresInput() {
  return (
    <FormSection columns={1} icon={RpgIcons.Robot} title="Cyberware">
      <AddAnotherMultiField<CwnCharacterData>
        createDefaultValue={createDefaultValue}
        parentFieldName="cyberware"
      >
        {({ index, onDelete, fieldId }) => (
          <CyberwareInputItem
            key={fieldId}
            postSortIndex={index}
            onDelete={onDelete}
          />
        )}
      </AddAnotherMultiField>
    </FormSection>
  );
}
