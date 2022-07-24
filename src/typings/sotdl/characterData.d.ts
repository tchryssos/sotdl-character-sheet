export interface SotdlSpell {
  spell_name: string;
  spell_rank: number;
  spell_tradition: string;
  spell_type: 'utility' | 'attack';
  spell_description: string;
  spell_total_castings: number;
  spell_remaining_castings: number;
}

export interface SotdlEquipment {
  equipment_name: string;
  equipment_notes?: string;
}

export interface SotdlWeapon {
  weapon_name: string;
  weapon_hands: 'one' | 'off' | 'two';
  weapon_damage: string;
  weapon_notes?: string;
}

export interface SotdlArmor {
  armor_defense: number;
  armor_name: string;
  armor_notes?: string;
}

export type SotdlCharacterData = {
  name: string;
  level: number;
  ancestry: string;
  paths: {
    novice_path: string;
    expert_path: string;
    master_path: string;
  };
  pathBenefits: string;
  ancestryBenefits: string;
  professions: string;
  languages: string;
  attributes: {
    strength: number;
    agility: number;
    intellect: number;
    will: number;
  };
  defense: number;
  damage: number;
  health: number;
  healing_rate: number;
  speed: number;
  perception: number;
  perception_bonus: number;
  damage: number;
  insanity: number;
  corruption: number;
  size: number;
  fateRolls: number;
  fortune: boolean;
  spell_power: number;
  active_armor_index: number;
  active_weapon_index: number;
  currency: {
    currency_gold: number;
    currency_silver: number;
    currency_copper: number;
  };
  spells: SotdlSpell[];
  equipment: SotdlEquipment[];
  weapons: SotdlWeapon[];
  armors: SotdlArmor[];
  background: string;
  appearance: string;
  generalNotes: string;
};
