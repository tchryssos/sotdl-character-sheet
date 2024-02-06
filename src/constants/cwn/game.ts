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
