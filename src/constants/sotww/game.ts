export const ATTRIBUTES = ['strength', 'agility', 'intellect', 'will'] as const;
export type SotwwAttribute = (typeof ATTRIBUTES)[number];

export const PATH_TYPES = ['novice', 'expert', 'master'] as const;
export type SotwwPathType = (typeof PATH_TYPES)[number];

export const WEAPON_TRAITS = [
  'ammunition',
  'brutal',
  'firearm',
  'forceful',
  'long',
  'nimble',
  'precise',
  'range',
  'special',
  'sharp',
  'shattering',
  'thrown',
  'versatile',
] as const;
export type SotwwWeaponTrait = (typeof WEAPON_TRAITS)[number];

export const WEAPON_ADVANTAGES = [
  'disarming',
  'disrupting',
  'guarding',
  'lunging',
  'pressing',
] as const;
export type SotwwWeaponAdvantage = (typeof WEAPON_ADVANTAGES)[number];

export const WEAPON_DISADVANTAGES = [
  'fixed',
  'light',
  'reload',
  'slow',
] as const;
export type SotwwWeaponDisadvantage = (typeof WEAPON_DISADVANTAGES)[number];

function recursiveSetAbbrv<T extends string>(
  obj: Record<T, string>,
  currTrait: T,
  sliceI = 1
): Record<T, string> {
  const abbrv = currTrait.slice(0, sliceI);
  if (Object.values(obj).includes(abbrv)) {
    return recursiveSetAbbrv(obj, currTrait, sliceI + 1);
  }
  // eslint-disable-next-line no-param-reassign
  obj[currTrait] = abbrv;
  return obj;
}

export const WEAPON_PROPERTY_ABBREVIATIONS = [
  ...WEAPON_TRAITS,
  ...WEAPON_ADVANTAGES,
  ...WEAPON_DISADVANTAGES,
].reduce(
  (obj, currProperty) => recursiveSetAbbrv(obj, currProperty),
  {} as Record<
    SotwwWeaponTrait | SotwwWeaponAdvantage | SotwwWeaponDisadvantage,
    string
  >
);
