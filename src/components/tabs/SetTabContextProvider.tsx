import { createContext, PropsWithChildren, useMemo, useState } from 'react';

type SetTabSignature = (_: unknown, index: number) => void;

type SetTabContext = {
  setTab: SetTabSignature;
  setSetTab: (setTabFn: SetTabSignature) => void;
};

const defaultSetTab = () => null;

export const SetTabContext = createContext<SetTabContext>({
  setTab: defaultSetTab,
  setSetTab: () => {},
});

export function SetTabContextProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [setTab, setSetTab] = useState<SetTabSignature>(defaultSetTab);

  const value = useMemo(
    () => ({
      setTab,
      setSetTab,
    }),
    [setTab]
  );

  return (
    <SetTabContext.Provider value={value}>{children}</SetTabContext.Provider>
  );
}
