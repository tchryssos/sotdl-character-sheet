import {
  SotwwWeaponAdvantage,
  SotwwWeaponDisadvantage,
  SotwwWeaponTrait,
} from '~/constants/sotww/game';
import { SotwwName } from './game';

type SotwwPathBenefit = {
  path_benefit_name: string;
  path_benefit_description: string;
};

export type SotwwWeapon = {
  weapon_name: string;
  weapon_damage: string;
  weapon_traits: SotwwWeaponTrait[];
  weapon_advantages: SotwwWeaponAdvantage[];
  weapon_disadvantages: SotwwWeaponDisadvantage[];
  weapon_grip: 0 | 1 | 2;
  weapon_description: string;
};

export type SotwwCharacterData = {
  type: SotwwName;
  name: string;
  level: number;
  ancestry: string;
  ancestry_traits: string;
  description: string;
  professions: string;
  languages: string;
  attribute_strength: number;
  attribute_agility: number;
  attribute_intellect: number;
  attribute_will: number;
  path_novice: string;
  path_novice_benefits: SotwwPathBenefit[];
  path_expert: string;
  path_expert_benefits: SotwwPathBenefit[];
  path_master: string;
  path_master_benefits: SotwwPathBenefit[];
  health_current: number;
  health_max: number;
  damage: number;
  defense: number;
  size: number;
  speed: number;
  weapons: SotwwWeapon[];
};
