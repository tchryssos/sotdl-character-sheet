import { createContext, PropsWithChildren, useMemo, useState } from 'react';

import { FieldArrayManipMethods } from '~/components/form/AddAnotherMultiField';
import { CwnArmor, CwnWeapon } from '~/typings/cwn/characterData';

export interface WeaponAndArmorContextInterface {
  weaponFieldArrayMethods: FieldArrayManipMethods<CwnWeapon> | undefined;
  setWeaponFieldArrayMethods: (
    methods: FieldArrayManipMethods<CwnWeapon>
  ) => void;
  armorFieldArrayMethods: FieldArrayManipMethods<CwnArmor> | undefined;
  setArmorFieldArrayMethods: (
    methods: FieldArrayManipMethods<CwnArmor>
  ) => void;
}

export const WeaponAndArmorContext =
  createContext<WeaponAndArmorContextInterface>({
    weaponFieldArrayMethods: undefined,
    setWeaponFieldArrayMethods: () => null,
    armorFieldArrayMethods: undefined,
    setArmorFieldArrayMethods: () => null,
  });

type WeaponAndArmorProviderProps = PropsWithChildren<unknown>;

export function WeaponAndArmorProvider({
  children,
}: WeaponAndArmorProviderProps) {
  const [weaponFieldArrayMethods, setWeaponFieldArrayMethods] =
    useState<WeaponAndArmorContextInterface['weaponFieldArrayMethods']>();
  const [armorFieldArrayMethods, setArmorFieldArrayMethods] =
    useState<WeaponAndArmorContextInterface['armorFieldArrayMethods']>();

  const providerValue = useMemo(
    () => ({
      weaponFieldArrayMethods,
      setWeaponFieldArrayMethods,
      armorFieldArrayMethods,
      setArmorFieldArrayMethods,
    }),
    [weaponFieldArrayMethods, armorFieldArrayMethods]
  );
  return (
    <WeaponAndArmorContext.Provider value={providerValue}>
      {children}
    </WeaponAndArmorContext.Provider>
  );
}
