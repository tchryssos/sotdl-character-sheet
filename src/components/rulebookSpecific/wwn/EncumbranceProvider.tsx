import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';

import {
  WwnArmor,
  WwnCharacterData,
  WwnEquipment,
  WwnWeapon,
} from '~/typings/wwn/characterData';

interface EncumbranceContextShape {
  readiedEncumbrance: number;
  stowedEncumbrance: number;
  calculateEncumbrances: () => void;
  useEncumbrance: boolean;
  setUseEncumbrance: (useEncumbrance: boolean) => void;
}

export const EncumbranceContext = createContext<EncumbranceContextShape>({
  readiedEncumbrance: 0,
  stowedEncumbrance: 0,
  calculateEncumbrances: () => null,
  useEncumbrance: true,
  setUseEncumbrance: () => null,
});

type EncumbranceProviderProps = PropsWithChildren<unknown>;

// for each encumberable ite type (weapons, armor, equipment), write a single reduce function that uses that items readied property (weapon_readied, equipment_readied, etc) to return the total encumbrance of all of the readied and unreadied items. Run all three of these reducers to get a value for each type, then return the sums of those values as an object
const reduceEncumbrances = (
  armors: WwnArmor[],
  weapons: WwnWeapon[],
  equipment: WwnEquipment[]
) => {
  const armorEncumbrance = armors.reduce(
    (currEnc, armor) => {
      const nextEnc = { ...currEnc };
      if (armor.armor_readied) {
        nextEnc.readiedEncumbrance += armor.armor_encumbrance;
      } else {
        nextEnc.stowedEncumbrance += armor.armor_encumbrance;
      }
      return nextEnc;
    },
    { readiedEncumbrance: 0, stowedEncumbrance: 0 }
  );

  const weaponEncumbrance = weapons.reduce(
    (currEnc, weapon) => {
      const nextEnc = { ...currEnc };
      if (weapon.weapon_readied) {
        nextEnc.readiedEncumbrance += weapon.weapon_encumbrance;
      } else {
        nextEnc.stowedEncumbrance += weapon.weapon_encumbrance;
      }
      return nextEnc;
    },
    { readiedEncumbrance: 0, stowedEncumbrance: 0 }
  );

  const equipmentEncumbrance = equipment.reduce(
    (currEnc, equipItem) => {
      const nextEnc = { ...currEnc };
      if (equipItem.equipment_readied) {
        nextEnc.readiedEncumbrance += equipItem.equipment_encumbrance;
      } else {
        nextEnc.stowedEncumbrance += equipItem.equipment_encumbrance;
      }
      return nextEnc;
    },
    { readiedEncumbrance: 0, stowedEncumbrance: 0 }
  );

  return {
    readiedEncumbrance:
      armorEncumbrance.readiedEncumbrance +
      weaponEncumbrance.readiedEncumbrance +
      equipmentEncumbrance.readiedEncumbrance,
    stowedEncumbrance:
      armorEncumbrance.stowedEncumbrance +
      weaponEncumbrance.stowedEncumbrance +
      equipmentEncumbrance.stowedEncumbrance,
  };
};

export function EncumbranceProvider({ children }: EncumbranceProviderProps) {
  const [readiedEncumbrance, setReadiedEncumbrance] = useState(0);
  const [stowedEncumbrance, setStowedEncumbrance] = useState(0);
  const [useEncumbrance, setUseEncumbrance] = useState(true);
  const { getValues } = useFormContext<WwnCharacterData>();

  const calculateEncumbrances = useCallback(() => {
    const armors = getValues('armors');
    const weapons = getValues('weapons');
    const equipment = getValues('equipment');

    const encumbrances = reduceEncumbrances(armors, weapons, equipment);

    setReadiedEncumbrance(encumbrances.readiedEncumbrance);
    setStowedEncumbrance(encumbrances.stowedEncumbrance);
  }, [getValues]);

  useEffect(() => {
    calculateEncumbrances();
  }, [calculateEncumbrances]);

  const providerValue = useMemo(
    () => ({
      readiedEncumbrance,
      stowedEncumbrance,
      calculateEncumbrances,
      useEncumbrance,
      setUseEncumbrance,
    }),
    [
      readiedEncumbrance,
      stowedEncumbrance,
      calculateEncumbrances,
      useEncumbrance,
      setUseEncumbrance,
    ]
  );

  return (
    <EncumbranceContext.Provider value={providerValue}>
      {children}
    </EncumbranceContext.Provider>
  );
}
