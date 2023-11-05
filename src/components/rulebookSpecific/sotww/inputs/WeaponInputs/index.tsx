import styled from '@emotion/styled';
import { PropsWithChildren, useCallback, useContext, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 as uuid4 } from 'uuid';

import { GridBox } from '~/components/box/GridBox';
import { AAMFormSection } from '~/components/form/AAMFormSection';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';
import { SortableAddAnotherChildProps } from '~/typings/form';
import { SotwwCharacterData, SotwwWeapon } from '~/typings/sotww/characterData';

import { WeaponInputItem } from './WeaponInputItem';

const HideCheckbox = styled(CheckboxInput)`
  justify-self: end;
  text-align: end;
`;

const createDefaultWeapon = (): SotwwWeapon => ({
  weapon_name: 'Club',
  weapon_advantages: [],
  weapon_damage: '1d6',
  weapon_description: '',
  weapon_disadvantages: [],
  weapon_grip: 'one',
  weapon_traits: [],
  weapon_equipped: false,
  weapon_id: uuid4(),
});

function WeaponChildWrapper({ children }: PropsWithChildren<unknown>) {
  const atLeastMd = useBreakpointsAtLeast('md');
  return <GridBox columns={atLeastMd ? 2 : 1}>{children}</GridBox>;
}

export function WeaponInputs() {
  const [hideUnequipped, setHideUnequipped] = useState(false);
  const { isEditMode } = useContext(EditContext);
  const { getValues } = useFormContext<SotwwCharacterData>();

  const onToggleHide = () => {
    setHideUnequipped(!hideUnequipped);
  };

  const filterUnequippedWeapons = useCallback(
    ({ fieldId, sortIndexMap }: SortableAddAnotherChildProps) => {
      const trueFieldIndex = sortIndexMap.get(fieldId);

      if (trueFieldIndex === undefined) {
        return false;
      }

      if (!isEditMode && hideUnequipped) {
        const weapons = getValues('weapons') as SotwwWeapon[];

        const weapon = weapons[trueFieldIndex];

        if (!weapon.weapon_equipped) {
          return false;
        }
      }

      return true;
    },
    [getValues, hideUnequipped, isEditMode]
  );

  return (
    <AAMFormSection columns={1} icon={RpgIcons.DualDaggers} title="Weapons">
      <AddAnotherMultiField<SotwwCharacterData>
        ChildWrapper={WeaponChildWrapper}
        createDefaultValue={createDefaultWeapon}
        filterFn={filterUnequippedWeapons}
        parentFieldName="weapons"
      >
        {({ index, onDelete }) => (
          <WeaponInputItem postSortIndex={index} onDelete={onDelete} />
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
