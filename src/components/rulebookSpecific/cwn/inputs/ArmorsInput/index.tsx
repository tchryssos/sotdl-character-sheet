import styled from '@emotion/styled';
import { useContext, useEffect, useRef, useState } from 'react';

import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/containers/FormSection';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
import { CwnArmor, CwnCharacterData } from '~/typings/cwn/characterData';

const HideCheckbox = styled(CheckboxInput)`
  justify-self: end;
  text-align: end;
`;

const createDefaultValue = () =>
  ({
    name: '',
    ac_ranged: 0,
    ac_melee: 0,
    damage_soak: 0,
    encumbrance: 0,
    trauma_target_mod: 0,
    description: '',
    weight: 'civilian',
    traits: [],
    equipped: false,
    accessories: [],
  } satisfies CwnArmor);

export function ArmorsInput() {
  const [hideUnequipped, setHideUnequipped] = useState(false);
  const lastHideStateRef = useRef(hideUnequipped);
  const { isEditMode } = useContext(EditContext);

  const onToggleHide = () => {
    setHideUnequipped(!hideUnequipped);
    lastHideStateRef.current = !hideUnequipped;
  };

  useEffect(() => {
    if (isEditMode) {
      setHideUnequipped(false);
    } else {
      setHideUnequipped(lastHideStateRef.current);
    }
  }, [isEditMode]);

  return (
    <FormSection columns={1} icon={RpgIcons.ArmorHead} title="Armors">
      <AddAnotherMultiField<CwnCharacterData>
        createDefaultValue={createDefaultValue}
        parentFieldName="armors"
      >
        {({ index, onDelete, fieldId }) => (
          <div>
            <div>armor</div>
          </div>
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
    </FormSection>
  );
}
