import { createContext } from 'react';

import { LoginItem } from '~/typings/loginItems';

type LoginItemsContext = {
  loginItems: LoginItem[];
  setLoginItems: (items: LoginItem[]) => void;
};

export const LoginItemsContext = createContext<LoginItemsContext>({
  loginItems: [],
  setLoginItems: () => null,
});
