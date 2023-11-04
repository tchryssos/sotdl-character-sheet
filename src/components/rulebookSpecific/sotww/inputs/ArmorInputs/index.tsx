import { PropsWithChildren } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { AAMFormSection } from '~/components/form/AAMFormSection';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { RpgIcons } from '~/constants/icons';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { SotwwArmor, SotwwCharacterData } from '~/typings/sotww/characterData';

import { ArmorInputItem } from './ArmorInputItem';

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
});

export function ArmorInputs() {
  return (
    <AAMFormSection columns={1} icon={RpgIcons.ArmorHead} title="Armors">
      <AddAnotherMultiField<SotwwCharacterData>
        ChildWrapper={ArmorChildWrapper}
        createDefaultValue={createDefaultArmor}
        parentFieldName="armors"
      >
        {({ index, onDelete }) => (
          <ArmorInputItem postSortIndex={index} onDelete={onDelete} />
        )}
      </AddAnotherMultiField>
    </AAMFormSection>
  );
}
