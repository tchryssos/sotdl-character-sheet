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
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { SortableAddAnotherChildProps } from '~/typings/form';
import { SotwwArmor, SotwwCharacterData } from '~/typings/sotww/characterData';

import { ArmorInputItem } from './ArmorInputItem';

const HideCheckbox = styled(CheckboxInput)`
  justify-self: end;
  text-align: end;
`;

function ArmorChildWrapper({ children }: PropsWithChildren<unknown>) {
  const isLessThanMd = useBreakpointsLessThan('md');
  return <GridBox columns={isLessThanMd ? 1 : 2}>{children}</GridBox>;
}

const createDefaultArmor = (): SotwwArmor => ({
  armor_name: 'Padded Armor',
  armor_description: '',
  armor_defense_score: 11,
  armor_defense_bonus: 0,
  armor_equipped: false,
  armor_id: uuid4(),
});

export function ArmorInputs() {
  const [hideUnequipped, setHideUnequipped] = useState(false);
  const { isEditMode } = useContext(EditContext);
  const { getValues } = useFormContext<SotwwCharacterData>();

  const onToggleHide = () => {
    setHideUnequipped(!hideUnequipped);
  };

  const filterUnequippedArmor = useCallback(
    ({ fieldId, sortIndexMap }: SortableAddAnotherChildProps) => {
      const trueFieldIndex = sortIndexMap.get(fieldId);

      if (trueFieldIndex === undefined) {
        return false;
      }

      if (!isEditMode && hideUnequipped) {
        const armors = getValues('armors') as SotwwArmor[];

        const armor = armors[trueFieldIndex];

        if (!armor.armor_equipped) {
          return false;
        }
      }

      return true;
    },
    [getValues, hideUnequipped, isEditMode]
  );

  return (
    <AAMFormSection columns={1} icon={RpgIcons.ArmorHead} title="Armors">
      <AddAnotherMultiField<SotwwCharacterData>
        ChildWrapper={ArmorChildWrapper}
        createDefaultValue={createDefaultArmor}
        filterFn={filterUnequippedArmor}
        parentFieldName="armors"
      >
        {({ index, onDelete }) => (
          <ArmorInputItem postSortIndex={index} onDelete={onDelete} />
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
