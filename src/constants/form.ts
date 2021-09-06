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
  attributeModifiers: createAttributes(true) as AttrObj<string>,
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
