import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useFormContext } from 'react-hook-form';

import { guaranteeNumberValue } from '~/logic/utils/form/guaranteeNumberValue';
import { getEquippedArmorAndAccessories } from '~/logic/utils/rulebookSpecific/cwn/getEquippedArmorAndAccessories';
import { CwnCharacterData } from '~/typings/cwn/characterData';

export interface DamageSoakContextInterface {
  calculateSoak: () => void;
}

export const DamageSoakContext = createContext<DamageSoakContextInterface>({
  calculateSoak: () => null,
});

type DamageSoakProviderProps = PropsWithChildren<unknown>;

export function DamageSoakProvider({ children }: DamageSoakProviderProps) {
  const { getValues, register, setValue, watch } =
    useFormContext<CwnCharacterData>();

  useEffect(() => {
    register('damage_soak_current');
    register('damage_soak_max');
  }, [register]);

  const maxDamageSoak = guaranteeNumberValue(watch('damage_soak_max'));

  const calculateSoak = useCallback(() => {
    const armors = getValues('armors');

    const { armor, accessories } = getEquippedArmorAndAccessories(armors);

    let updatedSoak = 0;

    if (armor) {
      const accessorySoak = accessories.reduce(
        (bonus, currArmor) =>
          bonus + guaranteeNumberValue(currArmor.damage_soak),
        0
      );

      updatedSoak = guaranteeNumberValue(armor.damage_soak) + accessorySoak;
    }

    setValue('damage_soak_max', updatedSoak);
  }, [getValues, setValue]);

  const providerValue = useMemo(
    () => ({
      calculateSoak,
    }),
    [calculateSoak]
  );

  useEffect(() => {
    setValue('damage_soak_current', maxDamageSoak);
  }, [maxDamageSoak, setValue]);

  return (
    <DamageSoakContext.Provider value={providerValue}>
      {children}
    </DamageSoakContext.Provider>
  );
}
