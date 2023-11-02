import styled from '@emotion/styled';
import { useRouter } from 'next/router';

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

import { AttributeInputs } from './inputs/AttributeInputs';
import { BackgroundInputs } from './inputs/BackgroundInputs';
import { BasicInfoInputs } from './inputs/BasicInfoInputs';
import { PathInputs } from './inputs/PathInputs/PathInputs';

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
];

const sharedGapProps = {
  columnGap: pxToRem(FORM_COLUMN_GAP),
  rowGap: pxToRem(FORM_ROW_GAP),
};

export function CharacterSheet({ character }: SotwwCharacterSheetProps) {
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

  const isLessThanMd = useBreakpointsLessThan('md');

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <EditContext.Provider value={{ ...editProviderVal, isEditMode: true }}>
      <SotwwCharacterSheet
        defaultValues={character?.characterData || DEFAULT_VALUES}
        onSubmit={() => undefined}
      >
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
          <TabPanel>
            <GridBox columns={isLessThanMd ? 1 : 2} {...sharedGapProps}>
              <BasicInfoInputs />
              <BackgroundInputs />
            </GridBox>
          </TabPanel>
          <TabPanel>
            <GridBox columns={1} {...sharedGapProps}>
              <AttributeInputs />
              <PathInputs />
            </GridBox>
          </TabPanel>
        </Tabs>
      </SotwwCharacterSheet>
    </EditContext.Provider>
  );
}
