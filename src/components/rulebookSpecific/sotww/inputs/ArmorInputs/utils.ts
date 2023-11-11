import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

export const createArmorFieldName = makeNestedFieldNameFn<
  SotwwCharacterData,
  'armors'
>('armors');
