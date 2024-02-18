import {
  ArmorTrait,
  ArmorWeight,
  ContactRelationship,
  FocusLevel,
} from '~/constants/cwn/game';
import { CwnName } from './game';

export interface CwnContact {
  relationship: ContactRelationship;
  name: string;
  description: string;
}

export interface CwnEdge {
  name: string;
  description: string;
}

export interface CwnFocus {
  name: string;
  level: FocusLevel;
  description: string;
}

export interface CwnMajorInjury {
  name: string;
  description: string;
}

export interface CwnOtherStatus {
  name: string;
  description: string;
}

export interface CwnArmor {
  name: string;
  ac_ranged: number;
  ac_melee: number;
  damage_soak: number;
  encumbrance: number;
  trauma_target_mod: number;
  description: string;
  weight: ArmorWeight;
  traits: ArmorTrait[];
  equipped: boolean;
  accessories: Omit<CwnArmor, 'accessories' | 'equipped' | 'weight'>[];
}

export type CwnCharacterData = {
  type: CwnName;
  name: string;
  level: number;
  description: string;
  goal: string;
  languages: string;
  ties: string;
  attribute_strength: number;
  attribute_dexterity: number;
  attribute_constitution: number;
  attribute_intelligence: number;
  attribute_wisdom: number;
  attribute_charisma: number;
  background_name: string;
  background_details: string;
  skill_administer: number;
  skill_connect: number;
  skill_drive: number;
  skill_exert: number;
  skill_fix: number;
  skill_heal: number;
  skill_know: number;
  skill_lead: number;
  skill_notice: number;
  skill_perform: number;
  skill_program: number;
  skill_punch: number;
  skill_shoot: number;
  skill_sneak: number;
  skill_survive: number;
  skill_stab: number;
  skill_talk: number;
  skill_trade: number;
  skill_work: number;
  remaining_skill_points: number;
  contacts: CwnContact[];
  foci: CwnFocus[];
  edges: CwnEdge[];
  health_max: number;
  health_current: number;
  system_strain_current: number;
  system_strain_max: number;
  traumatic_hit: boolean;
  trauma_target: number;
  major_injuries: CwnMajorInjury[];
  other_statuses: CwnOtherStatus[];
  save_physical: number;
  save_mental: number;
  save_evasion: number;
  save_luck: number;
  armor_class_ranged: number;
  armor_class_melee: number;
  armors: CwnArmor[];
  //   attack_bonus_base: number;
  //   attack_bonus_melee: number;
  //   attack_bonus_ranged: number;
  //   initiative_bonus: number;
  //   equipment: WwnEquipment[];
  //   weapons: WwnWeapon[];
  //   armors: WwnArmor[];
  //   currency_copper: number;
  //   currency_silver: number;
  //   currency_gold: number;
};

export type AttributeName = keyof Pick<
  CwnCharacterData,
  | 'attribute_charisma'
  | 'attribute_constitution'
  | 'attribute_dexterity'
  | 'attribute_intelligence'
  | 'attribute_strength'
  | 'attribute_wisdom'
>;

export type SaveName = keyof Pick<
  CwnCharacterData,
  'save_physical' | 'save_evasion' | 'save_mental' | 'save_luck'
>;
