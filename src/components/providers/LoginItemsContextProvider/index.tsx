import { useUser } from '@auth0/nextjs-auth0';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { LoginItemsContext } from '~/logic/contexts/loginItemsContext';
import { LoginItem } from '~/typings/loginItems';
import { StrictSessionUser } from '~/typings/user';

import { determineLoginItems } from './determineLoginItems';

interface LoginItemsContextProviderProps {
  children: React.ReactNode;
}

export function LoginItemsContextProvider({
  children,
}: LoginItemsContextProviderProps) {
  const { user } = useUser();
  const [loginItems, setLoginItems] = useState<LoginItem[]>([]);

  useEffect(() => {
    if (user) {
      const userLoginItems = determineLoginItems(user as StrictSessionUser);
      setLoginItems(userLoginItems);
    }
  }, [user]);

  const value = useMemo(
    () => ({
      loginItems,
      setLoginItems,
    }),
    [loginItems, setLoginItems]
  );

  return (
    <LoginItemsContext.Provider value={value}>
      {children}
    </LoginItemsContext.Provider>
  );
}
