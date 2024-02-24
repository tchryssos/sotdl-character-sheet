import { CwnWeapon } from '~/typings/cwn/characterData';

export const DEFAULT_WEAPON = {
  name: '',
  type: 'ranged',
  damage: [1, 8, 0],
  range: [10, 80],
  shock: [0, 0],
  encumbrance: 1,
  mag: 15,
  attribute: ['dexterity'],
  readied: false,
  description: '',
  trauma_die: [1, 8],
  trauma_rating: 2,
} satisfies CwnWeapon;
