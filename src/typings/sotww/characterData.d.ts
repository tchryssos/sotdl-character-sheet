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
  weapon_grip: 'off' | 'one' | 'two';
  weapon_description: string;
  weapon_equipped: boolean;
  weapon_id: string;
};

export type SotwwArmor = {
  armor_name: string;
  armor_description: string;
  armor_defense_bonus: number;
  armor_defense_score: number;
  armor_equipped: boolean;
  armor_id: string;
};

export type SotwwEquipment = {
  equipment_name: string;
  equipment_description: string;
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
  defense_natural: number;
  size: number;
  speed: number;
  weapons: SotwwWeapon[];
  armors: SotwwArmor[];
  equipment: SotwwEquipment[];
  currency_copper: number;
  currency_silver: number;
  currency_gold: number;
};
