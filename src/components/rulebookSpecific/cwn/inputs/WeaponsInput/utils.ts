import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { CwnCharacterData } from '~/typings/cwn/characterData';

export const createWeaponFieldName = makeNestedFieldNameFn<
  CwnCharacterData,
  'weapons'
>('weapons');
