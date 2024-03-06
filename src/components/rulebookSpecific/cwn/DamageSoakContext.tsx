import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';

import { getEquippedArmorAndAccessories } from '~/logic/utils/rulebookSpecific/cwn/getEquippedArmorAndAccessories';
import { CwnCharacterData } from '~/typings/cwn/characterData';

export interface DamageSoakContextInterface {
  damageSoak: number;
  calculateSoak: () => void;
}

export const DamageSoakContext = createContext<DamageSoakContextInterface>({
  damageSoak: 0,
  calculateSoak: () => null,
});

type DamageSoakProviderProps = PropsWithChildren<unknown>;

export function DamageSoakProvider({ children }: DamageSoakProviderProps) {
  const [damageSoak, setDamageSoak] = useState(0);

  const { getValues } = useFormContext<CwnCharacterData>();

  const calculateSoak = useCallback(() => {
    const armors = getValues('armors');

    const { armor, accessories } = getEquippedArmorAndAccessories(armors);

    if (armor) {
      const accessorySoak = accessories.reduce(
        (bonus, currArmor) => bonus + currArmor.damage_soak,
        0
      );

      setDamageSoak(armor.damage_soak + accessorySoak);
    }
  }, [getValues]);

  const providerValue = useMemo(
    () => ({
      damageSoak,
      calculateSoak,
    }),
    [damageSoak, calculateSoak]
  );

  return (
    <DamageSoakContext.Provider value={providerValue}>
      {children}
    </DamageSoakContext.Provider>
  );
}
