import { SotwwName } from './game';

export type SotwwCharacterData = {
  type: SotwwName;
  name: string;
  level: number;
  ancestry: string;
  ancestry_traits: string;
  description: string;
  professions: string;
  attribute_strength: number;
  attribute_agility: number;
  attribute_intellect: number;
  attribute_will: number;
};
