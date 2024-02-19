import styled from '@emotion/styled';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 as uuid4 } from 'uuid';

import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/containers/FormSection';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
import { CwnArmor, CwnCharacterData } from '~/typings/cwn/characterData';
import { SortableAddAnotherChildProps } from '~/typings/form';

import { ArmorInputItem } from './ArmorInputItem';

const HideCheckbox = styled(CheckboxInput)`
  justify-self: end;
  text-align: end;
`;

const createDefaultValue = () =>
  ({
    name: '',
    ac_ranged: 10,
    ac_melee: 10,
    damage_soak: 0,
    encumbrance: 0,
    trauma_target_mod: 0,
    description: '',
    weight: 'civilian',
    traits: [],
    readied: false,
    accessories: [],
    equippedTo: '',
    id: uuid4(),
  } satisfies CwnArmor);

export function ArmorsInput() {
  const { getValues } = useFormContext<CwnCharacterData>();
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

  const filterUnequippedArmor = useCallback(
    ({ fieldId, sortIndexMap }: SortableAddAnotherChildProps) => {
      const trueFieldIndex = sortIndexMap.get(fieldId);

      if (trueFieldIndex === undefined) {
        return false;
      }

      if (!isEditMode && hideUnequipped) {
        const armors = getValues('armors') as CwnArmor[];

        const armor = armors[trueFieldIndex];

        if (!armor.readied) {
          return false;
        }
      }

      return true;
    },
    [getValues, hideUnequipped, isEditMode]
  );

  return (
    <FormSection columns={1} icon={RpgIcons.ArmorHead} title="Armors">
      <AddAnotherMultiField<CwnCharacterData>
        createDefaultValue={createDefaultValue}
        filterFn={filterUnequippedArmor}
        parentFieldName="armors"
      >
        {({ index, onDelete, fieldId }) => (
          <ArmorInputItem
            key={fieldId}
            postSortIndex={index}
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
    </FormSection>
  );
}
