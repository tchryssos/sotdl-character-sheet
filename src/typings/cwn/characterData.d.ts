import {
  ArmorTrait,
  ArmorWeight,
  ContactRelationship,
  FocusLevel,
  Attribute,
  Skill,
  WeaponType,
  CyberwareType,
  CyberwareConcealmentLevel,
  CyberwareAs,
  ProgramVerbTarget,
} from '~/constants/cwn/game';
import { CwnName } from './game';
import { ValuesOf } from '../util';

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

export type CwnArmor = {
  id: string;
  name: string;
  ac_ranged: number;
  ac_melee: number;
  damage_soak: number;
  encumbrance: number;
  trauma_target_mod: number;
  description: string;
  weight: ArmorWeight;
  traits: ArmorTrait[];
  readied: boolean;
  // Accessories are armors too
  // so we sort of "join table" them here
  accessories: string[];
  equippedTo: string;
};

export type CwnWeapon = {
  name: string;
  weapon_type: WeaponType;
  damage: `${number}d${number}` | `${number}d${number}+${number}`;
  range: `${number}/${number}` | '';
  shock: `${number}/AC ${number}` | '';
  encumbrance: number;
  description: string;
  mag: number;
  attribute: Attribute[];
  readied: boolean;
  trauma_die: `${number}d${number}` | '';
  trauma_rating: number;
  id: string;
};

export type CwnCyberware = {
  name: string;
  description: string;
  cyberware_type: CyberwareType;
  concealment: CyberwareConcealmentLevel;
  system_strain: number;
  effect: string;
  id: string;
  as: CyberwareAs | null;
};

export type CwnCyberdeck = {
  name: string;
  bonus_access: number;
  memory: number;
  shielding: number;
  cpu: number;
  encumbrance: number;
  description: string;
  readied: boolean;
};

export type CwnProgramVerb = {
  name: string;
  target_types: ProgramVerbTarget[];
  access_cost: number;
  skill_check_mod: number;
  use: string;
};

export type CwnProgramSubject = {
  name: string;
  subject_type: ProgramVerbTarget;
  description: string;
};

export type AttributeName = ValuesOf<{
  [K in Attribute]: `attribute_${K}`;
}>;
type AttributeFields = {
  [K in AttributeName]: number;
};

type SkillName = ValuesOf<{
  [K in Skill]: `skill_${K}`;
}>;
type SkillFields = {
  [K in SkillName]: number;
};

export type CwnCharacterData = {
  type: CwnName;
  name: string;
  level: number;
  description: string;
  goal: string;
  languages: string;
  ties: string;
  background_name: string;
  background_details: string;
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
  weapons: CwnWeapon[];
  cyberware: CwnCyberware[];
  cyberdecks: CwnCyberdeck[];
  program_subjects: CwnProgramSubject[];
  program_verbs: CwnProgramVerb[];
  //   attack_bonus_base: number;
  //   attack_bonus_melee: number;
  //   attack_bonus_ranged: number;
  //   initiative_bonus: number;
  //   equipment: WwnEquipment[];
  //   weapons: WwnWeapon[];
  //   currency_copper: number;
  //   currency_silver: number;
  //   currency_gold: number;
} & AttributeFields &
  SkillFields;

export type SaveName = keyof Pick<
  CwnCharacterData,
  'save_physical' | 'save_evasion' | 'save_mental' | 'save_luck'
>;
