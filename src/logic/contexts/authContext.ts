import { createContext } from 'react';

import { User } from '~/typings/auth';

interface AuthContextProps {
  user: User;
  setUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: {
    isAuthenticated: false,
  },
  setUser: () => null,
});
