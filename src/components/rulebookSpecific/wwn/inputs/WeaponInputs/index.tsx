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

interface WeaponInputProps {
  index: number;
  onDelete: (idx: number) => void;
}

const createWeaponFieldName = (
  name: keyof WwnWeapon,
  index: number
): `weapons.${number}.${keyof WwnWeapon}` => `weapons.${index}.${name}`;

function WeaponInput({ index, onDelete }: WeaponInputProps) {
  const { setValue, watch } = useFormContext();
  const { isEditMode } = useContext(EditContext);
  const isLessThanSm = useBreakpointsLessThan('sm');
  if (isLessThanSm) {
    return <div>weapon</div>;
  }
  return (
    <WeaponInputItem
      createWeaponFieldName={createWeaponFieldName}
      index={index}
    />
  );
}

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
          <WeaponInput index={index} key={fieldId} onDelete={onDelete} />
        )}
      </AddAnotherMultiField>
    </WeaponInputFormSection>
  );
}
