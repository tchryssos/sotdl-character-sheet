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
import { FORM_COLUMN_GAP, FORM_ROW_GAP } from '~/constants/styles';
import { DEFAULT_VALUES } from '~/constants/wwn/form';
import { EditContext } from '~/logic/contexts/editContext';
import {
  useBreakpointsAtLeast,
  useBreakpointsLessThan,
} from '~/logic/hooks/useBreakpoints';
import { useSheetHotkeys } from '~/logic/hooks/useSheetHotkeys';
import { useSheetState } from '~/logic/hooks/useSheetState';
import { getTabIndex } from '~/logic/utils/getTabIndex';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
import { StrictCharacter } from '~/typings/characters';
import { WwnCharacterData } from '~/typings/wwn/characterData';

import { AcProvider } from './AcProvider';
import { EncumbranceProvider } from './EncumbranceProvider';
import { FormNav } from './FormNav';
import { ArmorInputs } from './inputs/ArmorInputs';
import { AttributeInputs } from './inputs/AttributeInputs';
import { BackgroundInputs } from './inputs/BackgroundInputs';
import { BasicInfoInputs } from './inputs/BasicInfoInputs';
import { ClassInputs } from './inputs/ClassInputs';
import { CombatBonusInputs } from './inputs/CombatBonusInputs';
import { CurrencyInputs } from './inputs/CurrencyInputs';
import { DefenseInputs } from './inputs/DefenseInputs';
import { EncumbranceInput } from './inputs/EncumbranceInput';
import { EquipmentInputs } from './inputs/EquipmentInputs';
import { FociInputs } from './inputs/FociInputs';
import { HealthInputs } from './inputs/HealthInputs';
import { MagicEffortInputs } from './inputs/MagicEffortInputs';
import { MagicTraditionInputs } from './inputs/MagicTraditionInputs';
import { SpellSlotInputs } from './inputs/MagicTraditionInputs/SpellSlotInputs';
import { SkillInputs } from './inputs/SkillInputs';
import { WeaponInputs } from './inputs/WeaponInputs';

const WwnCharacterSheet = styled(FormComponent)`
  padding-bottom: ${({ theme }) => theme.spacing[48]};
`;

interface WwnCharacterSheetProps {
  character: StrictCharacter<WwnCharacterData>;
}

const tabLabels: TabLabelObject[] = [
  {
    label: 'Description',
    icon: RpgIcons.Scroll,
  },
  {
    label: 'Stats',
    icon: RpgIcons.Dice,
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
    label: 'Equipment',
    icon: RpgIcons.Chest,
  },
];

const sharedGapProps = {
  columnGap: pxToRem(FORM_COLUMN_GAP),
  rowGap: pxToRem(FORM_ROW_GAP),
};

export function CharacterSheet({ character }: WwnCharacterSheetProps) {
  const {
    isEditMode,
    setIsEditMode,
    // isLoading,
    // setIsLoading,
    isMyCharacter,
    setIsMyCharacter,
    editProviderVal,
    queryTab,
  } = useSheetState();
  useSheetHotkeys(isEditMode, setIsEditMode);
  const router = useRouter();

  const { user } = useUser();

  useEffect(() => {
    setIsMyCharacter(character?.playerId === user?.id);
  }, [character?.playerId, setIsMyCharacter, user?.id]);

  const isLessThanMd = useBreakpointsLessThan('md');
  const isLessThanSm = useBreakpointsLessThan('sm');
  const isAtLeastMd = useBreakpointsAtLeast('md');

  return (
    <EditContext.Provider value={editProviderVal}>
      <WwnCharacterSheet
        defaultValues={character?.characterData || DEFAULT_VALUES}
        onSubmit={() => undefined}
      >
        <FormNav isMyCharacter={isMyCharacter} />
        <EncumbranceProvider>
          <AcProvider>
            <Tabs
              defaultTab={getTabIndex(tabLabels, queryTab)}
              tabLabels={tabLabels}
              onChange={(index) =>
                router.replace(
                  {
                    query: {
                      ...router.query,
                      tab: tabLabels[index].label.toLowerCase(),
                    },
                  },
                  undefined,
                  { shallow: true }
                )
              }
            >
              {/* Description */}
              <TabPanel>
                <GridBox columns={isLessThanMd ? 1 : 2} {...sharedGapProps}>
                  <BasicInfoInputs />
                  <BackgroundInputs />
                </GridBox>
              </TabPanel>

              {/* Stats */}
              <TabPanel>
                <GridBox columns={isLessThanMd ? 1 : 2} {...sharedGapProps}>
                  <AttributeInputs />
                  <SkillInputs />
                  <EncumbranceInput />
                </GridBox>
              </TabPanel>

              {/* Abilities */}
              <TabPanel>
                <GridBox columns={1} {...sharedGapProps}>
                  <ClassInputs />
                  <FociInputs />
                </GridBox>
              </TabPanel>

              {/* Combat */}
              <TabPanel>
                <GridBox
                  // eslint-disable-next-line no-nested-ternary
                  columns={isLessThanSm ? 1 : isAtLeastMd ? 3 : 2}
                  {...sharedGapProps}
                >
                  <HealthInputs />
                  <DefenseInputs />
                  <CombatBonusInputs />
                  <WeaponInputs />
                  <ArmorInputs />
                </GridBox>
              </TabPanel>

              {/* Magic */}
              <TabPanel>
                <GridBox columns={1} {...sharedGapProps}>
                  <GridBox {...sharedGapProps} columns={isLessThanSm ? 1 : 2}>
                    <MagicEffortInputs />
                    <SpellSlotInputs />
                  </GridBox>

                  <MagicTraditionInputs />
                </GridBox>
              </TabPanel>

              {/* Equipment */}
              <TabPanel>
                <GridBox columns={1} {...sharedGapProps}>
                  <EquipmentInputs />
                  <CurrencyInputs />
                </GridBox>
              </TabPanel>
            </Tabs>
          </AcProvider>
        </EncumbranceProvider>
      </WwnCharacterSheet>
    </EditContext.Provider>
  );
}
