export const ATTRIBUTES = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
] as const;
export type Attribute = (typeof ATTRIBUTES)[number];

export const SKILLS = [
  'administer',
  'connect',
  'convince',
  'craft',
  'exert',
  'heal',
  'know',
  'lead',
  'magic',
  'notice',
  'perform',
  'pray',
  'punch',
  'ride',
  'sail',
  'shoot',
  'sneak',
  'survive',
  'stab',
  'trade',
  'work',
] as const;
export type Skill = (typeof SKILLS)[number];

export const WEAPON_TRAITS = [
  '2h',
  'ap',
  'fx',
  'l',
  'll',
  'n',
  'pm',
  'r',
  's',
  'sr',
  'ss',
  't',
] as const;
export type WeaponTrait = (typeof WEAPON_TRAITS)[number];

export const ARMOR_WEIGHT = ['light', 'medium', 'heavy', 'shield'] as const;
export type ArmorWeight = (typeof ARMOR_WEIGHT)[number];

export const EFFORT_STATUSES = ['ready', 'day', 'scene', 'indefinite'] as const;
export type EffortStatus = (typeof EFFORT_STATUSES)[number];
