import { CwnWeapon } from '~/typings/cwn/characterData';

export const DEFAULT_WEAPON: Omit<CwnWeapon, 'id'> = {
  name: '',
  type: 'ranged',
  damage: '1d8',
  range: '10/80',
  shock: '1/AC 15',
  encumbrance: 1,
  mag: 15,
  attribute: ['dexterity'],
  readied: false,
  description: '',
  trauma_die: '1d8',
  trauma_rating: 2,
};
