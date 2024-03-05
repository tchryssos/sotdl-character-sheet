import { useUser } from '@auth0/nextjs-auth0';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Box } from '~/components/box/Box';
import { GridBox } from '~/components/box/GridBox';
import { FormSection } from '~/components/form/containers/FormSection';
import { Form } from '~/components/form/Form';
import { NumberInput } from '~/components/form/NumberInput';
import { TabPanel } from '~/components/tabs/TabPanel';
import { Tabs } from '~/components/tabs/Tabs';
import { CWN_TAB_LABELS, DEFAULT_VALUES } from '~/constants/cwn/form';
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
import { AttackBonusInput } from './inputs/AttackBonusInput';
import { AttributeInputs } from './inputs/AttributeInputs';
import { BasicInfoInputs } from './inputs/BasicInfoInputs';
import { ContactsInput } from './inputs/ContactsInput';
import { CyberdeckInputs } from './inputs/CyberdeckInputs';
import { CyberwaresInput } from './inputs/CyberwaresInput';
import { EdgesInput } from './inputs/EdgesInput';
import { FociInput } from './inputs/FociInput';
import { HealthInputs } from './inputs/HealthInputs';
import { HistoryInputs } from './inputs/HistoryInputs';
import { InjuryInputs } from './inputs/InjuryInputs';
import { InventoryInputs } from './inputs/InventoryInputs';
import { OtherStatusesInput } from './inputs/OtherStatusesInput';
import { ProgramSubjectInputs } from './inputs/ProgramSubjectInputs';
import { ProgramVerbInputs } from './inputs/ProgramVerbInputs';
import { SaveInputs } from './inputs/SaveInputs';
import { SkillInputs } from './inputs/SkillInputs';
import { WeaponsInput } from './inputs/WeaponsInput';

interface CwnCharacterSheetProps {
  character: StrictCharacter<CwnCharacterData>;
}

const StyledForm = styled(Form)`
  padding-bottom: ${({ theme }) => theme.spacing[48]};
`;

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
            defaultTab={getTabIndex(CWN_TAB_LABELS, queryTab)}
            tabLabels={CWN_TAB_LABELS}
            onChange={(index) =>
              router.replace({
                query: {
                  ...router.query,
                  tab: CWN_TAB_LABELS[index].label.toLowerCase(),
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
                <GridBox gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr' }}>
                  <AttackBonusInput />
                  <ArmorClassInputs />
                </GridBox>
                <GridBox columns={isLessThanMd ? 1 : 2}>
                  <WeaponsInput />
                  <ArmorsInput />
                </GridBox>
              </GridBox>
            </TabPanel>

            {/* Equipment */}
            <TabPanel>
              <GridBox columns={1}>
                <CyberwaresInput />
                <InventoryInputs />
                <FormSection
                  columns={1}
                  icon={RpgIcons.DollarCoin}
                  title="Currency"
                >
                  <NumberInput<CwnCharacterData> name="currency" />
                </FormSection>
              </GridBox>
            </TabPanel>

            {/* Hacking */}
            <TabPanel>
              <GridBox columns={1}>
                <CyberdeckInputs />
                <GridBox gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr' }}>
                  <ProgramVerbInputs />
                  <ProgramSubjectInputs />
                </GridBox>
              </GridBox>
            </TabPanel>
          </Tabs>
        </AcProvider>
      </StyledForm>
    </EditContext.Provider>
  );
}
