import { PropsWithChildren } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { AAMFormSection } from '~/components/form/AAMFormSection';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { RpgIcons } from '~/constants/icons';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';
import { SotwwCharacterData, SotwwWeapon } from '~/typings/sotww/characterData';

import { WeaponInputItem } from './WeaponInputItem';

const createDefaultWeapon = (): SotwwWeapon => ({
  weapon_name: 'Club',
  weapon_advantages: [],
  weapon_damage: '1d6',
  weapon_description: '',
  weapon_disadvantages: [],
  weapon_grip: 'one',
  weapon_traits: [],
});

function WeaponChildWrapper({ children }: PropsWithChildren<unknown>) {
  const atLeastMd = useBreakpointsAtLeast('md');
  return <GridBox columns={atLeastMd ? 2 : 1}>{children}</GridBox>;
}

export function WeaponInputs() {
  return (
    <AAMFormSection columns={1} icon={RpgIcons.DualDaggers} title="Weapons">
      <AddAnotherMultiField<SotwwCharacterData>
        ChildWrapper={WeaponChildWrapper}
        createDefaultValue={createDefaultWeapon}
        parentFieldName="weapons"
      >
        {({ index, onDelete }) => (
          <WeaponInputItem postSortIndex={index} onDelete={onDelete} />
        )}
      </AddAnotherMultiField>
    </AAMFormSection>
  );
}
