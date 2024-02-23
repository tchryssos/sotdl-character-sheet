import styled from '@emotion/styled';
import { PropsWithChildren, useContext } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/containers/FormSection';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
import { useFilterUnreadied } from '~/logic/utils/rulebookSpecific/cwn/useFilterUnreadied';
import { CwnCharacterData, CwnWeapon } from '~/typings/cwn/characterData';

const HideCheckbox = styled(CheckboxInput)`
  justify-self: end;
  text-align: end;
`;

function WeaponChildWrapper({ children }: PropsWithChildren<unknown>) {
  return <GridBox columns={1}>{children}</GridBox>;
}

const createDefaultValue = () =>
  ({
    name: '',
    type: 'ranged',
    damage: [1, 8, 0],
    range: [10, 80],
    shock: [0, 0],
    encumbrance: 1,
    mag: 15,
    attribute: ['dexterity'],
    readied: false,
    description: '',
    trauma_die: [1, 8],
    trauma_rating: 2,
  } satisfies CwnWeapon);

export function WeaponsInput() {
  const { isEditMode } = useContext(EditContext);
  const { hideUnreadied, onToggleHide, filterUnreadied } =
    useFilterUnreadied<CwnCharacterData>('weapons');

  return (
    <FormSection columns={1} icon={RpgIcons.Pistol} title="Weapons">
      <AddAnotherMultiField<CwnCharacterData>
        ChildWrapper={WeaponChildWrapper}
        createDefaultValue={createDefaultValue}
        filterFn={filterUnreadied}
        parentFieldName="weapons"
      >
        {({ index, onDelete, fieldId }) => (
          <div>
            <div>weapon</div>
          </div>
        )}
      </AddAnotherMultiField>
      {!isEditMode && (
        <HideCheckbox
          alwaysEditable
          customOnChange={onToggleHide}
          inputLike
          isChecked={hideUnreadied}
          name="Hide Unequipped"
          size="sm"
        />
      )}
    </FormSection>
  );
}
