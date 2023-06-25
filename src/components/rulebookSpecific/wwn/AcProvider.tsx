import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';

import { calcAttributeBonus } from '~/logic/utils/rulebookSpecific/wwn/calcAttributeBonus';
import { WwnArmor, WwnCharacterData } from '~/typings/wwn/characterData';

const reduceAc = (armors: WwnArmor[], dexterity: number) =>
  armors.reduce((currArmor, armor) => {
    if (armor.armor_readied) {
      if (armor.armor_defense > currArmor) {
        return armor.armor_defense;
      }
      if (armor.armor_weight === 'shield') {
        return currArmor + 1;
      }
      return currArmor;
    }
    return currArmor;
  }, 10 + calcAttributeBonus(dexterity));

interface AcContextInterface {
  ac: number;
  calculateAc: () => void;
}

export const AcContext = createContext<AcContextInterface>({
  ac: 10,
  calculateAc: () => null,
});

type AcProviderProps = PropsWithChildren<unknown>;

export function AcProvider({ children }: AcProviderProps) {
  const [ac, setAC] = useState(10);
  const { getValues } = useFormContext<WwnCharacterData>();

  const calculateAc = useCallback(() => {
    const armors = getValues('armors');
    const dexterity = getValues('attribute_dexterity');

    setAC(reduceAc(armors, dexterity));
  }, [getValues]);

  useEffect(() => {
    calculateAc();
  }, [calculateAc]);

  const providerValue = useMemo(
    () => ({
      ac,
      calculateAc,
    }),
    [ac, calculateAc]
  );

  return (
    <AcContext.Provider value={providerValue}>{children}</AcContext.Provider>
  );
}
