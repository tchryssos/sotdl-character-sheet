import styled from '@emotion/styled';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/FormSection';
import { Text } from '~/components/Text';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { WwnCharacterData, WwnWeapon } from '~/typings/wwn/characterData';

import { WeaponInputItem } from './WeaponInputItem';

const WeaponInputFormSection = styled(FormSection)`
  grid-column: 1 / span 2;
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
