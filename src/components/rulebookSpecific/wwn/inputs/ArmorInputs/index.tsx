import styled from '@emotion/styled';
import { useContext, useEffect, useState } from 'react';

import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
import { WwnArmor, WwnCharacterData } from '~/typings/wwn/characterData';

import { AAMFormSection } from '../AAMFormSection';
import { ArmorInputItem } from './ArmorInputItem';

const HideCheckbox = styled(CheckboxInput)`
  justify-self: end;
  text-align: end;
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
  const [hideUnequipped, setHideUnequipped] = useState(false);
  const { isEditMode } = useContext(EditContext);

  const onToggleHide = () => {
    setHideUnequipped(!hideUnequipped);
  };

  useEffect(() => {
    if (isEditMode) {
      setHideUnequipped(false);
    }
  }, [isEditMode]);
  return (
    <AAMFormSection columns={1} icon={RpgIcons.ArmorHead} title="Armors">
      <AddAnotherMultiField<WwnCharacterData>
        createDefaultValue={createDefaultArmor}
        parentFieldName="armors"
      >
        {({ index, onDelete, fieldId }) => (
          <ArmorInputItem
            hideUnequipped={hideUnequipped}
            index={index}
            key={fieldId}
            onDelete={onDelete}
          />
        )}
      </AddAnotherMultiField>
      {!isEditMode && (
        <HideCheckbox
          alwaysEditable
          customOnChange={onToggleHide}
          inputLike
          isChecked={hideUnequipped}
          name="Hide Unequipped"
          size="sm"
        />
      )}
    </AAMFormSection>
  );
}
