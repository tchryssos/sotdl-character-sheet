import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';

import { DEFAULT_VALUES } from '~/constants/cwn/form';
import { guaranteeNumberValue } from '~/logic/utils/form/guaranteeNumberValue';
import { calcAttributeBonus } from '~/logic/utils/rulebookSpecific/wwn/calcAttributeBonus';
import { CwnCharacterData } from '~/typings/cwn/characterData';

interface AcContextInterface {
  rangedAc: number;
  meleeAc: number;
  calculateAc: () => void;
}

export const AcContext = createContext<AcContextInterface>({
  meleeAc: DEFAULT_VALUES.armor_class_melee,
  rangedAc: DEFAULT_VALUES.armor_class_ranged,
  calculateAc: () => null,
});

type AcProviderProps = PropsWithChildren<unknown>;

export function AcProvider({ children }: AcProviderProps) {
  const [rangedAc, setRangedAc] = useState(DEFAULT_VALUES.armor_class_ranged);
  const [meleeAc, setMeleeAc] = useState(DEFAULT_VALUES.armor_class_melee);

  const { getValues } = useFormContext<CwnCharacterData>();

  const calculateAc = useCallback(() => {
    const dexterity = getValues('attribute_dexterity');
    const dexBonus = calcAttributeBonus(dexterity);

    const armors = getValues('armors');
    const equippedArmor = armors.find(
      (a) => a.weight !== 'accessory' && a.weight !== 'shield' && a.readied
    );
    const equippedAccessories = armors.filter(
      (a) => equippedArmor && a.equippedTo === equippedArmor.id
    );
    const shield = armors.find((a) => a.weight === 'shield' && a.readied);

    const accessoryBonuses = [...equippedAccessories, shield]
      .filter(Boolean)
      .reduce(
        (bonusObj, currArmor) => ({
          melee:
            bonusObj.melee + (guaranteeNumberValue(currArmor!.ac_melee) || 0),
          ranged:
            bonusObj.ranged + (guaranteeNumberValue(currArmor!.ac_ranged) || 0),
        }),
        { melee: 0, ranged: 0 }
      );

    setRangedAc(
      dexBonus +
        guaranteeNumberValue(
          equippedArmor?.ac_ranged || DEFAULT_VALUES.armor_class_ranged
        ) +
        accessoryBonuses.ranged
    );
    setMeleeAc(
      dexBonus +
        guaranteeNumberValue(
          equippedArmor?.ac_melee || DEFAULT_VALUES.armor_class_melee
        ) +
        accessoryBonuses.melee
    );
  }, [getValues]);

  const providerValue = useMemo(
    () => ({
      meleeAc,
      rangedAc,
      calculateAc,
    }),
    [rangedAc, meleeAc, calculateAc]
  );

  return (
    <AcContext.Provider value={providerValue}>{children}</AcContext.Provider>
  );
}
