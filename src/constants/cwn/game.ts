const ATTRIBUTES = [
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
  'drive',
  'exert',
  'fix',
  'heal',
  'know',
  'lead',
  'notice',
  'perform',
  'program',
  'punch',
  'shoot',
  'sneak',
  'survive',
  'stab',
  'talk',
  'trade',
  'work',
] as const;

// If we use the skills array we want it to be alphabetized
// so we just do some TS tomfoolery to make the types play nice
export const SKILLS = (
  UNSORTED_SKILLS as unknown as string[]
).sort() as unknown as typeof UNSORTED_SKILLS;
export type Skill = (typeof UNSORTED_SKILLS)[number];

export const CONTACT_RELATIONSHIPS = ['acquaintance', 'friend'] as const;
export type ContactRelationship = (typeof CONTACT_RELATIONSHIPS)[number];

export const FOCUS_LEVELS = ['1', '2'] as const;
export type FocusLevel = (typeof FOCUS_LEVELS)[number];

export const ARMOR_WEIGHT = [
  'civilian',
  'suit',
  'accessory',
  'shield',
] as const;
export type ArmorWeight = (typeof ARMOR_WEIGHT)[number];

export const ARMOR_TRAITS = {
  subtle: {
    name: 'Subtle',
    description:
      "Subtle armor can be worn in most social situations without drawing comment; it's either discreet enough or commonplace enough that only the most formal occasions will forbid it. Obvious armor is the sort of thing that nobody would wear unless they expected imminent trouble, and its wearers will likely be treated accordingly.",
    abbreviation: 'S',
  },
  heavy: {
    name: 'Heavy',
    description:
      'The armor or accessory applies a -1 penalty to all Sneak or Exert skill checks. Multiple heavy items stack.',
    abbreviation: 'H',
  },
  'no-suit': {
    name: 'No Suit',
    description: 'This accessory cannot be added to suit armor.',
    abbreviation: 'NS',
  },
} as const;
export type ArmorTrait = keyof typeof ARMOR_TRAITS;

export const WEAPON_TYPES = ['melee/thrown', 'ranged'] as const;
export type WeaponType = (typeof WEAPON_TYPES)[number];
