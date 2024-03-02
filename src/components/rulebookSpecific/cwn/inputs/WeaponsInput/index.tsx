import styled from '@emotion/styled';
import { PropsWithChildren, useContext } from 'react';
import { v4 as uuid4 } from 'uuid';

import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/containers/FormSection';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
import { useFilterUnreadied } from '~/logic/utils/rulebookSpecific/cwn/useFilterUnreadied';
import { CwnCharacterData, CwnWeapon } from '~/typings/cwn/characterData';

import { WeaponAndArmorContext } from '../../WeaponAndArmorProvider';
import { DEFAULT_WEAPON } from './consts';
import { WeaponInputItem } from './WeaponInputItem';

const HideCheckbox = styled(CheckboxInput)`
  justify-self: end;
  text-align: end;
`;

function WeaponChildWrapper({ children }: PropsWithChildren<unknown>) {
  return <GridBox columns={1}>{children}</GridBox>;
}

const createDefaultValue = (): CwnWeapon => ({
  ...DEFAULT_WEAPON,
  id: uuid4(),
});

export function WeaponsInput() {
  const { isEditMode } = useContext(EditContext);
  const { hideUnreadied, onToggleHide, filterUnreadied } =
    useFilterUnreadied<CwnCharacterData>('weapons');
  const { setWeaponFieldArrayMethods } = useContext(WeaponAndArmorContext);

  return (
    <FormSection columns={1} icon={RpgIcons.Pistol} title="Weapons">
      <AddAnotherMultiField<CwnCharacterData>
        ChildWrapper={WeaponChildWrapper}
        createDefaultValue={createDefaultValue}
        filterFn={filterUnreadied}
        parentFieldName="weapons"
        setFieldArrayMethods={setWeaponFieldArrayMethods}
      >
        {({ index, onDelete, fieldId }) => (
          <WeaponInputItem
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
          isChecked={hideUnreadied}
          name="Hide Unequipped"
          size="sm"
        />
      )}
    </FormSection>
  );
}
