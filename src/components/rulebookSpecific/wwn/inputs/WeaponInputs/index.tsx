import styled from '@emotion/styled';
import { PropsWithChildren, useContext, useEffect, useState } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';
import { WwnCharacterData, WwnWeapon } from '~/typings/wwn/characterData';

import { AAMFormSection } from '../../../../form/AAMFormSection';
import { WeaponInputItem } from './WeaponInputItem';

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

function WeaponChildWrapper({ children }: PropsWithChildren<unknown>) {
  const atLeastMd = useBreakpointsAtLeast('md');
  return <GridBox columns={atLeastMd ? 2 : 1}>{children}</GridBox>;
}

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
    <AAMFormSection columns={1} icon={RpgIcons.DualDaggers} title="Weapons">
      <AddAnotherMultiField<WwnCharacterData>
        ChildWrapper={WeaponChildWrapper}
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
    </AAMFormSection>
  );
}
