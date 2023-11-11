import { upperFirst } from 'lodash';

import { SelectOption } from '~/components/form/typings';

export const makeSimpleSelectOptionsFromArray = (
  arr: string[] | readonly string[]
): SelectOption[] =>
  arr.map((z) => ({
    label: upperFirst(z),
    value: z,
  }));
