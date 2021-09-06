import startCase from 'lodash.startcase';

import { SelectOption } from '~/components/form/typings';
import { Attribute } from '~/typings/game';

import { ATTRIBUTES, EXPERT_PATHS } from './game';

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

export const expertPathSelectOptions = Object.keys(EXPERT_PATHS).reduce(
  (options, key) => {
    const keyOpts: SelectOption[] = EXPERT_PATHS[
      key as keyof typeof EXPERT_PATHS
    ].map((p) => ({
      label: startCase(p),
      value: p,
    }));
    keyOpts.unshift({
      label: `-- Path of ${startCase(key)} --`,
      value: key,
      disabled: true,
    });
    return [...options, ...keyOpts];
  },
  [] as SelectOption[]
);
