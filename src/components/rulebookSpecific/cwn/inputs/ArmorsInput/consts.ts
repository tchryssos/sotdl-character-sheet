import { CwnArmor } from '~/typings/cwn/characterData';

export const DEFAULT_ARMOR: Omit<CwnArmor, 'id'> = {
  name: '',
  ac_ranged: 10,
  ac_melee: 10,
  damage_soak: 0,
  encumbrance: 0,
  trauma_target_mod: 0,
  description: '',
  weight: 'civilian',
  traits: [],
  readied: false,
  accessories: [],
  equippedTo: '',
};
