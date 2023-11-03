import { SotwwWeapon } from '~/typings/sotww/characterData';

export const createWeaponFieldName = (
  name: keyof SotwwWeapon,
  index: number
): `weapons.${number}.${keyof SotwwWeapon}` => `weapons.${index}.${name}`;
