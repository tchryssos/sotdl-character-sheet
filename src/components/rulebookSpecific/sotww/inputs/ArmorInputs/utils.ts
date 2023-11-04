import { SotwwArmor } from '~/typings/sotww/characterData';

export const createArmorFieldName = (
  name: keyof SotwwArmor,
  index: number
): `armors.${number}.${keyof SotwwArmor}` => `armors.${index}.${name}`;
