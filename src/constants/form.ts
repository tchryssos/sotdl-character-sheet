import startCase from 'lodash.startcase';

import { SelectOption } from '~/components/form/typings';
import { Attribute } from '~/typings/game';

import { ATTRIBUTES, EXPERT_PATHS, MASTER_PATHS } from './game';

type AttrObj<T> = Record<Attribute, T>;

const createAttributes = (isBonus?: boolean) =>
  ATTRIBUTES.reduce((attrObj: AttrObj<Attribute | string>, currAttr) => {
    const clone = { ...attrObj };
    clone[currAttr] = `${currAttr}${isBonus ? '_bonus' : ''}`;
    return clone;
  }, {} as AttrObj<Attribute | string>);

export const FIELD_NAMES = {
  name: 'name',
  level: 'level',
  ancestry: 'ancestry',
  paths: {
    novice_path: 'novice_path',
    expert_path: 'expert_path',
    master_path: 'master_path',
  },
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
};

export const DEFAULT_VALUES = {
  [FIELD_NAMES.level]: 0,
  [FIELD_NAMES.attributes.strength]: 10,
  [FIELD_NAMES.attributes.will]: 10,
  [FIELD_NAMES.attributes.intellect]: 10,
  [FIELD_NAMES.attributes.agility]: 10,
  [FIELD_NAMES.perception]: 10,
  [FIELD_NAMES.damage]: 0,
  [FIELD_NAMES.health]: 1,
  [FIELD_NAMES.insanity]: 0,
  [FIELD_NAMES.corruption]: 0,
  [FIELD_NAMES.defense]: 10,
  [FIELD_NAMES.speed]: 10,
  [FIELD_NAMES.size]: 1,
};

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
