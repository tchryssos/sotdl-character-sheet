import { useUser } from '@auth0/nextjs-auth0';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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

import { BackgroundInputs } from './inputs/BackgroundInputs';
import { BasicInfoInputs } from './inputs/BasicInfoInputs';

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
        </Tabs>
      </StyledForm>
    </EditContext.Provider>
  );
}
