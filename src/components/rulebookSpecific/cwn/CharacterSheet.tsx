import { useUser } from '@auth0/nextjs-auth0';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Box } from '~/components/box/Box';
import { GridBox } from '~/components/box/GridBox';
import { Form } from '~/components/form/Form';
import { TabPanel } from '~/components/tabs/TabPanel';
import { Tabs } from '~/components/tabs/Tabs';
import { TabLabelObject } from '~/components/tabs/types';
import { DEFAULT_VALUES } from '~/constants/cwn/form';
import { RpgIcons } from '~/constants/icons';
import { FORM_COLUMN_GAP, FORM_ROW_GAP } from '~/constants/styles';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { useSheetHotkeys } from '~/logic/hooks/useSheetHotkeys';
import { useSheetState } from '~/logic/hooks/useSheetState';
import { getTabIndex } from '~/logic/utils/getTabIndex';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
import { StrictCharacter } from '~/typings/characters';
import { CwnCharacterData } from '~/typings/cwn/characterData';

import { AcProvider } from './AcProvider';
import { ArmorClassInputs } from './inputs/ArmorClassInputs';
import { ArmorsInput } from './inputs/ArmorsInput';
import { AttributeInputs } from './inputs/AttributeInputs';
import { BasicInfoInputs } from './inputs/BasicInfoInputs';
import { ContactsInput } from './inputs/ContactsInput';
import { EdgesInput } from './inputs/EdgesInput';
import { FociInput } from './inputs/FociInput';
import { HealthInputs } from './inputs/HealthInputs';
import { HistoryInputs } from './inputs/HistoryInputs';
import { InjuryInputs } from './inputs/InjuryInputs';
import { OtherStatusesInput } from './inputs/OtherStatusesInput';
import { SaveInputs } from './inputs/SaveInputs';
import { SkillInputs } from './inputs/SkillInputs';

interface CwnCharacterSheetProps {
  character: StrictCharacter<CwnCharacterData>;
}

const StyledForm = styled(Form)`
  padding-bottom: ${({ theme }) => theme.spacing[48]};
`;

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
    label: 'Status',
    icon: RpgIcons.SmileGuy,
  },
  {
    label: 'Abilities',
    icon: RpgIcons.Ripple,
  },
  {
    label: 'Combat',
    icon: RpgIcons.StackedSkulls,
  },
  // {
  //   label: 'Magic',
  //   icon: RpgIcons.Fireball,
  // },
  {
    label: 'Equipment',
    icon: RpgIcons.Chest,
  },
];

const sharedGapProps = {
  columnGap: pxToRem(FORM_COLUMN_GAP),
  rowGap: pxToRem(FORM_ROW_GAP),
};

export function CwnCharacterSheet({ character }: CwnCharacterSheetProps) {
  const isLessThanMd = useBreakpointsLessThan('md');

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

  return (
    <EditContext.Provider value={editProviderVal}>
      <StyledForm
        defaultValues={character?.characterData || DEFAULT_VALUES}
        onSubmit={() => undefined}
      >
        <AcProvider>
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
                <HistoryInputs />
                <Box gridColumnEnd={isLessThanMd ? 2 : 3} gridColumnStart={1}>
                  <ContactsInput />
                </Box>
              </GridBox>
            </TabPanel>

            {/* Stats */}
            <TabPanel>
              <GridBox columns={isLessThanMd ? 1 : 2} {...sharedGapProps}>
                <AttributeInputs />
                <SkillInputs />
              </GridBox>
            </TabPanel>

            {/* Status */}
            <TabPanel>
              <GridBox columns={1} {...sharedGapProps}>
                <HealthInputs />
                <SaveInputs />
                <InjuryInputs />
                <OtherStatusesInput />
              </GridBox>
            </TabPanel>

            {/* Abilities */}
            <TabPanel>
              <GridBox columns={1} {...sharedGapProps}>
                <EdgesInput />
                <FociInput />
              </GridBox>
            </TabPanel>

            {/* Combat */}
            <TabPanel>
              <GridBox columns={1} {...sharedGapProps}>
                <ArmorClassInputs />
                <ArmorsInput />
              </GridBox>
            </TabPanel>

            {/* Equipment */}
            <TabPanel>
              <Box>Equipment</Box>
            </TabPanel>
          </Tabs>
        </AcProvider>
      </StyledForm>
    </EditContext.Provider>
  );
}
