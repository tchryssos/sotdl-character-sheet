type Attribute = 'strength' | 'agility' | 'intellect' | 'will';

export const ATTRIBUTES: Attribute[] = [
  'strength',
  'agility',
  'intellect',
  'will',
];

type AttrObj<T> = Record<Attribute, T>;

const createAttributes = (isMod?: boolean) =>
  ATTRIBUTES.reduce((attrObj: AttrObj<Attribute | string>, currAttr) => {
    const clone = { ...attrObj };
    clone[currAttr] = `${currAttr}${isMod ? '_mod' : ''}`;
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
