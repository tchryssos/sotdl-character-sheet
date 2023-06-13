export const ATTRIBUTES = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
] as const;
export type Attribute = (typeof ATTRIBUTES)[number];

const UNSORTED_SKILLS = [
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
// If we use the skills array we want it to be alphebetized
// so we just do some TS tomfoolery to make the types play nice
export const SKILLS = (
  UNSORTED_SKILLS as unknown as string[]
).sort() as unknown as typeof UNSORTED_SKILLS;
export type Skill = (typeof UNSORTED_SKILLS)[number];

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
