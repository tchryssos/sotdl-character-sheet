import { Attribute } from '~/typings/game';

export const ANCESTRIES = [
  'human',
  'changeling',
  'clockwork',
  'dwarf',
  'goblin',
  'orc',
];

export const NOVICE_PATHS = ['magician', 'priest', 'rogue', 'warrior'];

export const EXPERT_PATHS = {
  faith: ['cleric', 'druid', 'oracle', 'paladin'],
  power: ['artificer', 'sorcerer', 'witch', 'wizard'],
  trickery: ['assassin', 'scout', 'thief', 'warlock'],
  war: ['berserker', 'fighter', 'ranger', 'spellbinder'],
};

export const ATTRIBUTES: Attribute[] = [
  'strength',
  'agility',
  'intellect',
  'will',
];
