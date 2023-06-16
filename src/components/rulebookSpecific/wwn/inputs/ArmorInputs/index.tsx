import styled from '@emotion/styled';

import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/FormSection';
import { RpgIcons } from '~/constants/icons';
import { WwnArmor, WwnCharacterData } from '~/typings/wwn/characterData';

import { ArmorInputItem } from './ArmorInputItem';

const ArmorInputFormSection = styled(FormSection)`
  grid-column: span 1;
  ${({ theme }) => theme.breakpoints.sm} {
    grid-column: span 2;
  }
  ${({ theme }) => theme.breakpoints.md} {
    grid-column: span 3;
  }
`;

const createDefaultArmor = (): WwnArmor => ({
  armor_name: '',
  armor_description: '',
  armor_encumbrance: 1,
  armor_readied: false,
  armor_defense: 1,
  armor_weight: 'light',
});

export function ArmorInputs() {
  return (
    <ArmorInputFormSection columns={1} icon={RpgIcons.ArmorHead} title="Armors">
      <AddAnotherMultiField<WwnCharacterData>
        createDefaultValue={createDefaultArmor}
        parentFieldName="armors"
      >
        {({ index, onDelete, fieldId }) => (
          <ArmorInputItem index={index} key={fieldId} onDelete={onDelete} />
        )}
      </AddAnotherMultiField>
    </ArmorInputFormSection>
  );
}
