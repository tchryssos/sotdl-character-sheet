import { createContext } from 'react';

import {
  RHFErrors,
  RHFRegister,
  RHFSetValue,
  RHFWatch,
} from '~/components/form/typings';

interface RHFContext {
  register: RHFRegister | undefined;
  errors: RHFErrors | undefined;
  watch: RHFWatch | undefined;
  setValue: RHFSetValue | undefined;
}

export const ReactHookFormContext = createContext<RHFContext>({
  register: undefined,
  errors: undefined,
  watch: undefined,
  setValue: undefined,
});
