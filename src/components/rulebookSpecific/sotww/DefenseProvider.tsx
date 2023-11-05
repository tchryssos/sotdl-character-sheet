/* eslint-disable camelcase */
import { debounce, sortBy, sumBy } from 'lodash';
import { createContext, PropsWithChildren, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { DEFAULT_VALUES } from '~/constants/sotww/form';
import { guaranteeNumberValue } from '~/logic/utils/form/guaranteeNumberValue';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

interface DefenseProviderInterface {
  totalDefense: number;
  recalculateDefense: () => void;
}

export const DefenseContext = createContext<DefenseProviderInterface>({
  totalDefense: DEFAULT_VALUES.defense,
  recalculateDefense: () => null,
});

export function DefenseProvider({ children }: PropsWithChildren<unknown>) {
  const { getValues } = useFormContext<SotwwCharacterData>();

  const [totalDefense, setTotalDefense] = useState(DEFAULT_VALUES.defense);

  /**
   * There's an edge case where two equipped armor pieces with the same armor score
   * but different bonuses are just sorted index-sequentially (I think).
   *
   * This means that there's no guarantee that the defense score will be "smart"
   * enough to know that the players probably intend to use the armor with the lower
   * bonus as their "main" armor, and get the defense bonus from the other piece.
   *
   * I'm not actually sure if this is possible in game, (ex. can you have two 15 armor
   * score pieces at all? I doubt it) so it might be moot
   * (which is why I'm not solving it now), but if I come back here trying to
   * figure this out in the future, this should help.
   */
  const recalculateDefense = useMemo(
    () =>
      debounce(() => {
        const { armors, defense_natural } = getValues();

        const naturalDefense =
          guaranteeNumberValue(defense_natural) || DEFAULT_VALUES.defense;

        // Select only equipped armors, sort by defense score
        const equippedArmors = sortBy(
          armors.filter((a) => a.armor_equipped),
          (a) => -guaranteeNumberValue(a.armor_defense_score)
        );

        const bestArmorScore = guaranteeNumberValue(
          equippedArmors[0]?.armor_defense_score
        );

        let defenseScore = naturalDefense;
        let armorSlice = 0;

        // If the best armor is better than natural defense,
        // use that score as your base defense score
        // and skip that armor piece when calculating bonuses
        if (bestArmorScore > naturalDefense) {
          defenseScore = bestArmorScore;
          armorSlice = 1;
        }

        const armorBonuses = sumBy(
          equippedArmors.slice(armorSlice),
          (a) => guaranteeNumberValue(a.armor_defense_bonus) || 0
        );

        setTotalDefense(defenseScore + armorBonuses);
      }, 100),
    [getValues]
  );

  const contextValue = useMemo(
    () => ({
      totalDefense,
      recalculateDefense,
    }),
    [totalDefense, recalculateDefense]
  );

  return (
    <DefenseContext.Provider value={contextValue}>
      {children}
    </DefenseContext.Provider>
  );
}
