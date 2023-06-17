import styled from '@emotion/styled';
import { useContext, useEffect, useState } from 'react';

import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/FormSection';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
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

const HideCheckbox = styled(CheckboxInput)`
  justify-self: end;
  text-align: end;
`;

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
  const [hideUnreadied, setHideUndreadied] = useState(false);
  const { isEditMode } = useContext(EditContext);

  const onToggleUnreadied = () => {
    setHideUndreadied(!hideUnreadied);
  };

  useEffect(() => {
    if (isEditMode) {
      setHideUndreadied(false);
    }
  }, [isEditMode]);
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
            hideUnreadied={hideUnreadied}
            index={index}
            key={fieldId}
            onDelete={onDelete}
          />
        )}
      </AddAnotherMultiField>
      {!isEditMode && (
        <HideCheckbox
          alwaysEditable
          customOnChange={onToggleUnreadied}
          inputLike
          isChecked={hideUnreadied}
          name="Hide Unreadied"
          size="sm"
        />
      )}
    </WeaponInputFormSection>
  );
}
