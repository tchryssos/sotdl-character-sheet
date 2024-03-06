import { PropsWithChildren, useContext } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/containers/FormSection';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
import { CwnCharacterData, CwnGeneralItem } from '~/typings/cwn/characterData';

import { InventoryInputItem } from './InventoryInputItem';

const createDefaultValue = (): CwnGeneralItem => ({
  name: '',
  description: '',
  encumbrance: 1,
});

function InventoryChildWrapper({ children }: PropsWithChildren<unknown>) {
  const { isEditMode } = useContext(EditContext);
  return (
    <GridBox
      gridTemplateColumns={{
        base: '1fr',
        xs: isEditMode ? '1fr' : '1fr 1fr',
        sm: isEditMode ? '1fr 1fr' : 'repeat(3, 1fr)',
        md: isEditMode ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
      }}
    >
      {children}
    </GridBox>
  );
}

export function InventoryInputs() {
  return (
    <FormSection
      columns={1}
      icon={RpgIcons.DescendingBottles}
      title="Inventory"
    >
      <AddAnotherMultiField<CwnCharacterData>
        ChildWrapper={InventoryChildWrapper}
        createDefaultValue={createDefaultValue}
        parentFieldName="inventory"
      >
        {({ index, onDelete, fieldId }) => (
          <InventoryInputItem
            key={fieldId}
            postSortIndex={index}
            onDelete={onDelete}
          />
        )}
      </AddAnotherMultiField>
    </FormSection>
  );
}
