import { createContext } from 'react';

import { RHFErrors, RHFRegister, RHFWatch } from '~/typings/form';

interface RHFContext {
  register: RHFRegister | undefined;
  errors: RHFErrors | undefined;
  watch: RHFWatch | undefined;
}

export const ReactHookFormContext = createContext<RHFContext>({
  register: undefined,
  errors: undefined,
  watch: undefined,
});
