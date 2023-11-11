import { PropsWithChildren } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { AAMFormSection } from '~/components/form/AAMFormSection';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { RpgIcons } from '~/constants/icons';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import {
  SotwwCharacterData,
  SotwwEquipment,
} from '~/typings/sotww/characterData';

import { EquipmentInputItem } from './EquipmentInputItem';

function EquipmentChildWrapper({ children }: PropsWithChildren<unknown>) {
  const isLessThanMd = useBreakpointsLessThan('md');
  const isLessThanSm = useBreakpointsLessThan('sm');
  return (
    // eslint-disable-next-line no-nested-ternary
    <GridBox columns={isLessThanMd ? (isLessThanSm ? 1 : 2) : 3}>
      {children}
    </GridBox>
  );
}

const createDefaultEquipment = (): SotwwEquipment => ({
  equipment_name: '',
  equipment_description: '',
});

export function EquipmentInputs() {
  return (
    <AAMFormSection
      columns={1}
      icon={RpgIcons.DescendingBottles}
      title="Equipment"
    >
      <AddAnotherMultiField<SotwwCharacterData>
        ChildWrapper={EquipmentChildWrapper}
        createDefaultValue={createDefaultEquipment}
        parentFieldName="equipment"
        // sortFn={sortByCollapsedStatus}
      >
        {({ index, onDelete }) => (
          <EquipmentInputItem postSortIndex={index} onDelete={onDelete} />
        )}
      </AddAnotherMultiField>
    </AAMFormSection>
  );
}
