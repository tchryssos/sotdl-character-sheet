import styled from '@emotion/styled';

import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/FormSection';
import { RpgIcons } from '~/constants/icons';
import { WwnCharacterData, WwnWeapon } from '~/typings/wwn/characterData';

import { WeaponInputItem } from './WeaponInputItem';

const WeaponInputFormSection = styled(FormSection)`
  grid-column: span 1;
  ${({ theme }) => theme.breakpoints.sm} {
    grid-column: span 2;
  }
  ${({ theme }) => theme.breakpoints.md} {
    grid-column: span 3;
  }
`;

const createWeaponFieldName = (
  name: keyof WwnWeapon,
  index: number
): `weapons.${number}.${keyof WwnWeapon}` => `weapons.${index}.${name}`;

const createDefaultWeapon = (): WwnWeapon => ({
  weapon_name: '',
  weapon_description: '',
  weapon_traits: [],
  weapon_shock: '',
  weapon_attribute: ['strength'],
  weapon_encumbrance: 1,
  weapon_readied: false,
  weapon_damage: '1d6',
});

export function WeaponInputs() {
  return (
    <WeaponInputFormSection
      columns={1}
      icon={RpgIcons.DualDaggers}
      title="Weapons"
    >
      <AddAnotherMultiField<WwnCharacterData>
        createDefaultValue={createDefaultWeapon}
        parentFieldName="weapons"
      >
        {({ index, onDelete, fieldId }) => (
          <WeaponInputItem
            createWeaponFieldName={createWeaponFieldName}
            index={index}
            key={fieldId}
            onDelete={onDelete}
          />
        )}
      </AddAnotherMultiField>
    </WeaponInputFormSection>
  );
}
