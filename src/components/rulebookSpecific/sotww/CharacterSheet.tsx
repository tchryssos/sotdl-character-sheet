import { useUser } from '@auth0/nextjs-auth0';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { Form as FormComponent } from '~/components/form/Form';
import { TabPanel } from '~/components/tabs/TabPanel';
import { Tabs } from '~/components/tabs/Tabs';
import { TabLabelObject } from '~/components/tabs/types';
import { RpgIcons } from '~/constants/icons';
import { DEFAULT_VALUES } from '~/constants/sotww/form';
import { FORM_COLUMN_GAP, FORM_ROW_GAP } from '~/constants/styles';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { useSheetHotkeys } from '~/logic/hooks/useSheetHotkeys';
import { useSheetState } from '~/logic/hooks/useSheetState';
import { getTabIndex } from '~/logic/utils/getTabIndex';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
import { StrictCharacter } from '~/typings/characters';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

import { DefenseProvider } from './DefenseProvider';
import { FormNav } from './FormNav';
import { ArmorInputs } from './inputs/ArmorInputs';
import { AttributeInputs } from './inputs/AttributeInputs';
import { BackgroundInputs } from './inputs/BackgroundInputs';
import { BasicInfoInputs } from './inputs/BasicInfoInputs';
import { CurrencyInputs } from './inputs/CurrencyInputs';
import { DefenseInputs } from './inputs/DefenseInputs';
import { EquipmentInputs } from './inputs/EquipmentInputs';
import { MagicTraditionInputs } from './inputs/MagicInputs/MagicTraditionInputs';
import { PathInputs } from './inputs/PathInputs/PathInputs';
import { PhysicalTraitsInputs } from './inputs/PhysicalTraitsInputs';
import { WeaponInputs } from './inputs/WeaponInputs';

const SotwwCharacterSheet = styled(FormComponent)`
  padding-bottom: ${({ theme }) => theme.spacing[48]};
`;

interface SotwwCharacterSheetProps {
  character?: StrictCharacter<SotwwCharacterData>;
}

const tabLabels: TabLabelObject[] = [
  {
    label: 'Description',
    icon: RpgIcons.Scroll,
  },
  {
    label: 'Abilities',
    icon: RpgIcons.Ripple,
  },
  {
    label: 'Combat',
    icon: RpgIcons.StackedSkulls,
  },
  {
    label: 'Magic',
    icon: RpgIcons.Fireball,
  },
  {
    label: 'Inventory',
    icon: RpgIcons.Chest,
  },
];

const sharedGapProps = {
  columnGap: pxToRem(FORM_COLUMN_GAP),
  rowGap: pxToRem(FORM_ROW_GAP),
};

export function CharacterSheet({ character }: SotwwCharacterSheetProps) {
  const { user } = useUser();
  const {
    isEditMode,
    setIsEditMode,
    isMyCharacter,
    setIsMyCharacter,
    editProviderVal,
    queryTab,
  } = useSheetState();
  useSheetHotkeys(isEditMode, setIsEditMode);
  const router = useRouter();

  const isLessThanMd = useBreakpointsLessThan('md');

  useEffect(() => {
    setIsMyCharacter(
      Boolean(character?.playerId && character.playerId === user?.id)
    );
  }, [character?.playerId, setIsMyCharacter, user?.id]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <EditContext.Provider value={editProviderVal}>
      <SotwwCharacterSheet
        defaultValues={character?.characterData || DEFAULT_VALUES}
        onSubmit={() => undefined}
      >
        <DefenseProvider>
          <FormNav isMyCharacter={isMyCharacter} />
          <Tabs
            defaultTab={getTabIndex(tabLabels, queryTab)}
            tabLabels={tabLabels}
            onChange={(index) =>
              router.replace({
                query: {
                  ...router.query,
                  tab: tabLabels[index].label.toLowerCase(),
                },
              })
            }
          >
            {/* Description */}
            <TabPanel>
              <GridBox columns={isLessThanMd ? 1 : 2} {...sharedGapProps}>
                <BasicInfoInputs />
                <BackgroundInputs />
              </GridBox>
            </TabPanel>

            {/* Abilities */}
            <TabPanel>
              <GridBox columns={1} {...sharedGapProps}>
                <AttributeInputs />
                <PathInputs />
              </GridBox>
            </TabPanel>

            {/* Combat */}
            <TabPanel>
              <GridBox columns={1} {...sharedGapProps}>
                <GridBox columns={2}>
                  <DefenseInputs />
                  <PhysicalTraitsInputs />
                </GridBox>
                <WeaponInputs />
                <ArmorInputs />
              </GridBox>
            </TabPanel>

            {/* Magic */}
            <TabPanel>
              <GridBox columns={1} {...sharedGapProps}>
                <MagicTraditionInputs />
              </GridBox>
            </TabPanel>

            {/* Inventory */}
            <TabPanel>
              <GridBox columns={1} {...sharedGapProps}>
                <EquipmentInputs />
                <CurrencyInputs />
              </GridBox>
            </TabPanel>
          </Tabs>
        </DefenseProvider>
      </SotwwCharacterSheet>
    </EditContext.Provider>
  );
}
