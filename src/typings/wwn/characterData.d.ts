import {
  ArmorWeight,
  Attribute,
  EffortStatus,
  WeaponTrait,
} from '../../constants/wwn/game';
import { WwnName } from './game';

export type WwnClassAbility = {
  class_ability_name: string;
  class_ability_description: string;
};

export type WwnFocus = {
  focus_name: string;
  focus_description: string;
  focus_level: 0 | 1 | 2;
};

export type WwnSpell = {
  spell_name: string;
  spell_description: string;
  spell_level: number;
  spell_prepared: boolean;
};

export type WwnMagicArt = {
  art_name: string;
  art_description: string;
};

export type WwnTradition = {
  tradition_name: string;
  tradition_spells: WwnSpell[];
  tradition_arts: WwnMagicArt[];
};

export type WwnEquipment = {
  equipment_name: string;
  equipment_description: string;
  equipment_encumbrance: number;
  equipment_readied: boolean;
};

export type WwnWeapon = {
  weapon_name: string;
  weapon_description: string;
  weapon_traits: WeaponTrait[];
  weapon_shock: [number, number] | ['', ''];
  weapon_attribute: Attribute[];
  weapon_range: [number, number] | ['', ''];
  weapon_encumbrance: number;
  weapon_readied: boolean;
};

export type WwnArmor = {
  armor_name: string;
  armor_description: string;
  armor_encumbrance: number;
  armor_readied: boolean;
  armor_defense: number;
  armor_class: ArmorWeight;
  armor_readied: boolean;
};

export type WwnEffort = {
  effort_status: EffortStatus;
};

export type WwnCharacterData = {
  type: WwnName;
  name: string;
  level: number;
  ancestry: string;
  goal: string;
  attribute_strength: number;
  attribute_dexterity: number;
  attribute_constitution: number;
  attribute_intelligence: number;
  attribute_wisdom: number;
  attribute_charisma: number;
  background_name: string;
  background_details: string;
  class_name: string;
  class_abilities: WwnClassAbility[];
  skill_administer: number;
  skill_connect: number;
  skill_convince: number;
  skill_craft: number;
  skill_exert: number;
  skill_heal: number;
  skill_know: number;
  skill_lead: number;
  skill_magic: number;
  skill_notice: number;
  skill_perform: number;
  skill_pray: number;
  skill_punch: number;
  skill_ride: number;
  skill_sail: number;
  skill_shoot: number;
  skill_sneak: number;
  skill_survive: number;
  skill_stab: number;
  skill_trade: number;
  skill_work: number;
  remaining_skill_points: number;
  foci: WwnFocus[];
  magic_efforts: WwnEffort[];
  magic_traditions: WwnTradition[];
  health_max: number;
  health_current: number;
  attack_bonus_base: number;
  attack_bonus_melee: number;
  attack_bonus_ranged: number;
  initiative_bonus: number;
  equipment: WwnEquipment[];
  weapons: WwnWeapon[];
  armors: WwnArmor[];
  currency_copper: number;
  currency_silver: number;
  currency_gold: number;
};
