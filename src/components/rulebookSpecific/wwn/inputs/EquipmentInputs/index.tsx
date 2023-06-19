import styled from '@emotion/styled';
import { PropsWithChildren, useContext, useEffect, useState } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/FormSection';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';
import { WwnCharacterData, WwnEquipment } from '~/typings/wwn/characterData';

import { EquipmentInputItem } from './EquipmentInputItem';

const HideCheckbox = styled(CheckboxInput)`
  justify-self: end;
  text-align: end;
`;

function EquipmentChildWrapper({ children }: PropsWithChildren<unknown>) {
  const isAtLeastMd = useBreakpointsAtLeast('md');

  return <GridBox columns={isAtLeastMd ? 2 : 1}>{children}</GridBox>;
}

const createDefaultEquipment = (): WwnEquipment => ({
  equipment_name: '',
  equipment_description: '',
  equipment_readied: false,
  equipment_encumbrance: 1,
});

export function EquipmentInputs() {
  const [hideUnreadied, setHideUnreadied] = useState(false);
  const { isEditMode } = useContext(EditContext);

  const onToggleHide = () => {
    setHideUnreadied(!hideUnreadied);
  };

  useEffect(() => {
    if (isEditMode) {
      setHideUnreadied(false);
    }
  }, [isEditMode]);

  return (
    <FormSection
      columns={1}
      icon={RpgIcons.DescendingBottles}
      title="Inventory"
    >
      <AddAnotherMultiField<WwnCharacterData>
        ChildWrapper={EquipmentChildWrapper}
        createDefaultValue={createDefaultEquipment}
        parentFieldName="equipment"
      >
        {({ index, onDelete, fieldId }) => (
          <EquipmentInputItem
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
          customOnChange={onToggleHide}
          inputLike
          isChecked={hideUnreadied}
          name="Hide Unreadied"
          size="sm"
        />
      )}
    </FormSection>
  );
}
