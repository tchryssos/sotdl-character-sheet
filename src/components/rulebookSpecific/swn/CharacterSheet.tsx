import { Title } from '~/components/typography/Title';
import { SWN_DEFAULT_VALUES } from '~/constants/swn/form';
import { useSheetHotkeys } from '~/logic/hooks/useSheetHotkeys';
import { useSheetState } from '~/logic/hooks/useSheetState';
import { SwnCharacterData } from '~/typings/swn/characterData';

import { BaseCharacterSheet } from '../shared/BaseCharacterSheet';
import { BasicInfoInputs } from '../shared/gameInputs/BasicInfoInputs';
import { HistoryInputs } from './gameInputs/HistoryInputs';

export const CharacterSheet: React.FC = () => (
  <BaseCharacterSheet defaultValues={SWN_DEFAULT_VALUES}>
    {() => (
      <>
        <BasicInfoInputs<SwnCharacterData> />
        <HistoryInputs />
      </>
    )}
  </BaseCharacterSheet>
);
