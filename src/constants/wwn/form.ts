import { WwnCharacterData } from '~/typings/wwn/characterData';

export const WWN_SKILL_UNTRAINED = -1;

export const DEFAULT_VALUES: WwnCharacterData = {
  type: 'wwn',
  name: 'Carmelle Rohner',
  level: 3,
  ancestry: 'Human',
  goal: 'Make $2,000 to pay for my sister’s medical bills',
  description: `I stood tall as a cowgirl, a beacon of strength and resilience. Donning a wide-brimmed hat atop my head, my braided hair tucked beneath its shadow, I faced the relentless sun with determination. My attire spoke volumes of my practicality, as I sported a high-collared blouse, shielding me from the elements, and a trusty leather vest, providing an extra layer of warmth and protection. My flowing denim skirt, designed with a slight flare for ease of movement, concealed the sturdy boots that carried me through rugged terrains.

  Leather gloves hugged my hands, battle-tested and ready to grip ropes and handle livestock. A bandana, tied securely around my neck or shielding my face, shielded me from the swirling dust and debris of the open range. A reliable leather belt, with its buckle proudly fastened, held my tools close at hand - a knife, a small pistol - always prepared for the unexpected.`,
  attribute_strength: 10,
  attribute_dexterity: 10,
  attribute_constitution: 10,
  attribute_intelligence: 10,
  attribute_wisdom: 10,
  attribute_charisma: 10,
  background_name: 'Cowpoke',
  background_details: `- Horseback riding: Expertise in controlling and riding horses.
  - Roping and lassoing: Skillful in capturing and restraining livestock.
  - Cattle herding: Efficiently gather and move herds of cattle.
  - Shooting and marksmanship: Proficient with pistols and rifles.
  - Fence building: Construct and maintain secure fences for livestock.`,
  class_name: 'Adventurer',
  class_abilities: [
    {
      class_ability_name: 'Shoot to loot',
      class_ability_description:
        'Shooting an Orb of Power picks it up. Shooting an ammo brick picks it up and automatically reloads all of your equipped weapons from reserves.',
    },
    {
      class_ability_name: 'ONE-TWO PUNCH ',
      class_ability_description: `Increases Melee Damage for 1.22 seconds after hiting a target with all 12 Shotgun Pellets.

      Melee Damage Increases:
      • 100% Increased Unpowered Melee Damage
      • 40% Increased Powered Melee Damage`,
    },
  ],
  skill_administer: WWN_SKILL_UNTRAINED,
  skill_connect: WWN_SKILL_UNTRAINED,
  skill_convince: WWN_SKILL_UNTRAINED,
  skill_craft: WWN_SKILL_UNTRAINED,
  skill_exert: WWN_SKILL_UNTRAINED,
  skill_heal: WWN_SKILL_UNTRAINED,
  skill_know: WWN_SKILL_UNTRAINED,
  skill_lead: WWN_SKILL_UNTRAINED,
  skill_magic: WWN_SKILL_UNTRAINED,
  skill_notice: WWN_SKILL_UNTRAINED,
  skill_perform: WWN_SKILL_UNTRAINED,
  skill_pray: WWN_SKILL_UNTRAINED,
  skill_punch: WWN_SKILL_UNTRAINED,
  skill_ride: WWN_SKILL_UNTRAINED,
  skill_sail: WWN_SKILL_UNTRAINED,
  skill_shoot: WWN_SKILL_UNTRAINED,
  skill_sneak: WWN_SKILL_UNTRAINED,
  skill_survive: WWN_SKILL_UNTRAINED,
  skill_stab: WWN_SKILL_UNTRAINED,
  skill_trade: WWN_SKILL_UNTRAINED,
  skill_work: WWN_SKILL_UNTRAINED,
  remaining_skill_points: 0,
  foci: [],
  magic_efforts: [],
  magic_traditions: [],
  health_max: 1,
  health_current: 1,
  system_strain: 0,
  attack_bonus_base: 0,
  attack_bonus_melee: 0,
  attack_bonus_ranged: 0,
  initiative_bonus: 0,
  equipment: [],
  weapons: [],
  armors: [],
  currency_copper: 0,
  currency_silver: 0,
  currency_gold: 0,
};
