import startCase from 'lodash.startcase';

import { SelectOption } from '~/components/form/typings';
import { Attribute } from '~/typings/game';

import { ATTRIBUTES, EXPERT_PATHS, MASTER_PATHS } from './game';

// START - Attributes - START
type AttrObj<T> = Record<Attribute, T>;
const createAttributes = (isBonus?: boolean) =>
  ATTRIBUTES.reduce((attrObj: AttrObj<Attribute | string>, currAttr) => {
    const clone = { ...attrObj };
    clone[currAttr] = `${currAttr}${isBonus ? '_bonus' : ''}`;
    return clone;
  }, {} as AttrObj<Attribute | string>);
// END - Attributes - END

// START - Spells and Magic - START
type CastingObj = Record<string, string>;
const spellLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const spellObjBuilder = (label: string) =>
  spellLevels.reduce((castingObj, currLevel) => {
    const castClone = { ...castingObj };
    castClone[currLevel] = `${label}_${currLevel}`;
    return castClone;
  }, {} as CastingObj);
const castings = spellObjBuilder('castings');
const spells = spellObjBuilder('spells');
// END - Spells and Magic - END

// START - Paths - START
export const generatePathOptions = (pathObj: Record<string, string[]>) =>
  Object.keys(pathObj).reduce((options, key) => {
    const keyOpts: SelectOption[] = pathObj[key].map((p) => ({
      label: startCase(p),
      value: p,
    }));
    keyOpts.unshift({
      label: `-- Paths of ${startCase(key)} --`,
      value: key,
      disabled: true,
    });
    return [...options, ...keyOpts];
  }, [] as SelectOption[]);

export const expertPathSelectOptions = generatePathOptions(EXPERT_PATHS);
export const masterPathSelectOptions = generatePathOptions(MASTER_PATHS);

export const SECOND_EXPERT_PATH = 'second_expert_path';
// END - Paths - END

// START - Form - START
export const FIELD_NAMES = {
  name: 'name',
  level: 'level',
  ancestry: 'ancestry',
  paths: {
    novice_path: 'novice_path',
    expert_path: 'expert_path',
    master_path: 'master_path',
  },
  pathBenefits: 'path_benefits',
  ancestryBenefits: 'ancestry_benefits',
  professions: 'professions',
  languages: 'languages',
  attributes: createAttributes() as AttrObj<Attribute>,
  attributeBonuses: createAttributes(true) as AttrObj<string>,
  defense: 'defense',
  damage: 'damage',
  health: 'health',
  healing_rate: 'healing_rate',
  speed: 'speed',
  perception: 'perception',
  perception_bonus: 'perception_bonus',
  insanity: 'insanity',
  corruption: 'corruption',
  size: 'size',
  reach: 'reach',
  space: 'space',
  fortune: 'fortune',
  fateRolls: 'fate_rolls',
  armors: {
    fieldName: 'armors',
    name: 'armor_name',
    defense: 'armor_defense',
    notes: 'armor_notes',
  },
  activeArmorIndex: 'active_armor_index',
  weapons: {
    fieldName: 'weapons',
    name: 'weapon_name',
    hands: 'weapon_hands',
    damage: 'weapon_damage',
    notes: 'weapon_notes',
  },
  activeWeaponIndex: 'active_weapon_index',
  ammoTrackers: {
    one: 'ammo_tracker_one',
    two: 'ammo_tracker_two',
  },
  currency: {
    gold: 'currency_gold',
    silver: 'currency_silver',
    copper: 'currency_copper',
  },
  equipment: {
    fieldName: 'equipment',
    name: 'equipment_name',
    value: 'equipment_value',
    notes: 'equipment_notes',
  },
  background: 'background',
  appearance: 'appearance',
  generalNotes: 'general_notes',
  spellPower: {
    fieldName: 'spell_power',
    castings: {
      fieldName: 'castings',
      castingsByLevel: {
        ...castings,
      },
    },
  },
  spells: {
    fieldName: 'spells',
    spellsByLevel: {
      ...spells,
    },
  },
};

// Per https://react-hook-form.com/api/useform
// it is encouraged to have default values for all fields
// I have them for most that aren't add-another-multiple fields
export const DEFAULT_VALUES = {
  [FIELD_NAMES.name]: '',
  [FIELD_NAMES.level]: 0,
  [FIELD_NAMES.ancestry]: '',
  [FIELD_NAMES.paths.novice_path]: '',
  [FIELD_NAMES.paths.expert_path]: '',
  [FIELD_NAMES.paths.master_path]: '',
  [FIELD_NAMES.pathBenefits]: '',
  [FIELD_NAMES.ancestryBenefits]: '',
  [FIELD_NAMES.professions]: '',
  [FIELD_NAMES.languages]: '',
  [FIELD_NAMES.attributes.strength]: 10,
  [FIELD_NAMES.attributes.will]: 10,
  [FIELD_NAMES.attributes.intellect]: 10,
  [FIELD_NAMES.attributes.agility]: 10,
  [FIELD_NAMES.attributeBonuses.strength]: 0,
  [FIELD_NAMES.attributeBonuses.agility]: 0,
  [FIELD_NAMES.attributeBonuses.intellect]: 0,
  [FIELD_NAMES.attributeBonuses.will]: 0,
  [FIELD_NAMES.perception]: 10,
  [FIELD_NAMES.perception_bonus]: 0,
  [FIELD_NAMES.damage]: 0,
  [FIELD_NAMES.health]: 1,
  [FIELD_NAMES.healing_rate]: 1,
  [FIELD_NAMES.insanity]: 0,
  [FIELD_NAMES.corruption]: 0,
  [FIELD_NAMES.defense]: 10,
  [FIELD_NAMES.speed]: 10,
  [FIELD_NAMES.size]: 1,
  [FIELD_NAMES.fateRolls]: 0,
  [FIELD_NAMES.ammoTrackers.one]: 5,
  [FIELD_NAMES.ammoTrackers.two]: 5,
  [FIELD_NAMES.spellPower.fieldName]: 0,
  [FIELD_NAMES.fortune]: false,
  [FIELD_NAMES.activeArmorIndex]: 0,
  [FIELD_NAMES.activeWeaponIndex]: 0,
  [FIELD_NAMES.currency.gold]: 0,
  [FIELD_NAMES.currency.silver]: 0,
  [FIELD_NAMES.currency.copper]: 0,
  [FIELD_NAMES.background]: '',
  [FIELD_NAMES.appearance]: '',
  [FIELD_NAMES.generalNotes]: '',
};
// END - Form - END
