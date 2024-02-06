import { useUser } from '@auth0/nextjs-auth0';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Form } from '~/components/form/Form';
import { TabPanel } from '~/components/tabs/TabPanel';
import { Tabs } from '~/components/tabs/Tabs';
import { TabLabelObject } from '~/components/tabs/types';
import { DEFAULT_VALUES } from '~/constants/cwn/form';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
import { useSheetHotkeys } from '~/logic/hooks/useSheetHotkeys';
import { useSheetState } from '~/logic/hooks/useSheetState';
import { getTabIndex } from '~/logic/utils/getTabIndex';
import { StrictCharacter } from '~/typings/characters';
import { CwnCharacterData } from '~/typings/cwn/characterData';

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

export function CwnCharacterSheet({ character }: CwnCharacterSheetProps) {
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
          <TabPanel>whatever</TabPanel>
        </Tabs>
      </StyledForm>
    </EditContext.Provider>
  );
}
