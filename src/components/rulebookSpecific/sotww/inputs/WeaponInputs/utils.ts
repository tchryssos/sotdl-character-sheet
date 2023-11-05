import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

export const createWeaponFieldName = makeNestedFieldNameFn<
  SotwwCharacterData,
  'weapons'
>('weapons');
