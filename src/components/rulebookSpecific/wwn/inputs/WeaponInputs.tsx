import styled from '@emotion/styled';

import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/FormSection';
import { RpgIcons } from '~/constants/icons';
import { WwnCharacterData, WwnWeapon } from '~/typings/wwn/characterData';

const WeaponInputFormSection = styled(FormSection)`
  grid-column: 1 / span 2;
`;

interface WeaponInputProps {
  index: number;
  onDelete: (idx: number) => void;
}

function WeaponInput({ index, onDelete }: WeaponInputProps) {
  return <div>weapon</div>;
}

const createDefaultWeapon = (): WwnWeapon => ({
  weapon_name: '',
  weapon_description: '',
  weapon_traits: [],
  weapon_shock: ['', ''],
  weapon_attribute: ['strength'],
  weapon_range: ['', ''],
  weapon_encumbrance: 1,
  weapon_readied: false,
});

export function WeaponInputs() {
  return (
    <WeaponInputFormSection icon={RpgIcons.DualDaggers} title="Weapons">
      <AddAnotherMultiField<WwnCharacterData>
        createDefaultValue={createDefaultWeapon}
        parentFieldName="weapons"
      >
        {({ index, onDelete, fieldId }) => (
          <WeaponInput index={index} key={fieldId} onDelete={onDelete} />
        )}
      </AddAnotherMultiField>
    </WeaponInputFormSection>
  );
}
