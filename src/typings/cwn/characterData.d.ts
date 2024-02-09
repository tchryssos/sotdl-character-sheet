import { ContactRelationship, FocusLevel } from '~/constants/cwn/game';
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

export type CwnCharacterData = {
  type: CwnName;
  name: string;
  level: number;
  description: string;
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
  major_injuries: CwnMajorInjury[];
  other_statuses: CwnOtherStatus[];
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
