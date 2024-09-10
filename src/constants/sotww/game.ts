export const ATTRIBUTES = ['strength', 'agility', 'intellect', 'will'] as const;
export type SotwwAttribute = (typeof ATTRIBUTES)[number];

export const PATH_TYPES = ['novice', 'expert', 'master'] as const;
export type SotwwPathType = (typeof PATH_TYPES)[number];

export const WEAPON_TRAITS = {
  ammunition:
    "You must have at least one piece of ammunition of the indicated kind to attack with this weapon. Ammunition, and a container to hold it (such as a quiver, case, or bag), is included in the weapon's price. You can recover spent ammunition after combat and make replacements while you rest.",
  bludgeoning:
    'When you attack with this weapon and get a critical success, the target becomes vulnerable until the end of your next turn.',
  brutal:
    'When rolling damage for an attack made using this weapon, you can reroll each die that comes up as 1 once. You must use the new number rolled, even if it is another 1.',
  disarming:
    'You ignore the bane imposed on your roll when you use this weapon to disarm.',
  firearm:
    'Attacks you make with this weapon create a loud noise. If the weapon becomes submerged in water, you must dry and clean it before you can make ranged attacks with it. Cleaning the weapon takes 1 hour of work using a tool kit and a pint of oil. It takes 1 minute to load this weapon. If you do something else during this time, you must start over from the beginning.',
  large:
    'The result of your roll to attack with this weapon while squeezing or while you are mounted result in an automatic failure.',
  light:
    'When you would add Bonus Damage to an attack made using this weapon, you add one fewer die (minimum +1d6).',
  long: 'When you attack with this weapon, increase your reach by 1 for the purpose of choosing targets.',
  misfire:
    'When you get a critical failure on an attack with this weapon, the weapon misfires. Make a luck roll. On a success, you need only reload the weapon before you can attack with it again. On a failure, the weapon is ruined until repaired, which takes 1 hour, a tool kit, and spare parts whose value equals half the selling price of the weapon.',
  nimble:
    'When you attack with this weapon, you can use Agility in place of Strength for the roll.',
  piercing:
    'When you attack with this weapon and get a critical success, the target becomes weakened until the end of your next turn.',
  range:
    'You select the target for your ranged attacks with this weapon from those within the listed number of yards.',
  reload:
    'You must load this weapon before you can make ranged attacks with it. You can use an action to load the weapon or, if you are capable of moving and you have a Speed of 2 or higher, you can give up your move to load the weapon.',
  slashing:
    'When you attack with this weapon and get a critical success, the target takes an extra 1d6 damage.',
  slow: 'You can attack with this weapon just once per round.',
  special: 'This weapon has special rules detailed in its description.',
  thrown:
    "You can make a ranged attack with this weapon by throwing it. You use Strength for the roll unless the weapon also has the Nimble trait. You choose your target from among those within the listed number of yards. If the attack results in a success, the weapon either sticks in the target's body or falls to its feet. If the attack results in a failure, the weapon lands 1d6 yards behind the target.",
  versatile:
    "When you wield this weapon with both hands, the weapon's damage increases by 1d6.",
} as const;

export const WEAPON_TRAIT_KEYS = Object.keys(
  WEAPON_TRAITS
) as (keyof typeof WEAPON_TRAITS)[];
export type SotwwWeaponTrait = (typeof WEAPON_TRAIT_KEYS)[number];

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

export const WEAPON_PROPERTY_ABBREVIATIONS = WEAPON_TRAIT_KEYS.reduce(
  (obj, currProperty) => recursiveSetAbbrv(obj, currProperty),
  {} as Record<SotwwWeaponTrait, string>
);

export const spellLevelValueToName = {
  0: 'starting',
  1: 'novice',
  2: 'expert',
  3: 'master',
} as const;
