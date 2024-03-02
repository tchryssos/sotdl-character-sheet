import { createContext, PropsWithChildren, useMemo, useState } from 'react';
import { useFieldArray } from 'react-hook-form';

type FieldArrayReturn = ReturnType<typeof useFieldArray>;

export interface WeaponAndArmorContextInterface {
  weaponFieldArrayMethods: FieldArrayReturn | undefined;
  setWeaponFieldArrayMethods: (methods: FieldArrayReturn) => void;
  armorFieldArrayMethods: FieldArrayReturn | undefined;
  setArmorFieldArrayMethods: (methods: FieldArrayReturn) => void;
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
    useState<FieldArrayReturn>();
  const [armorFieldArrayMethods, setArmorFieldArrayMethods] =
    useState<FieldArrayReturn>();

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
