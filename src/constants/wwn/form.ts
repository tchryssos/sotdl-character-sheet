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
  skill_connect: 1,
  skill_convince: WWN_SKILL_UNTRAINED,
  skill_craft: WWN_SKILL_UNTRAINED,
  skill_exert: 3,
  skill_heal: WWN_SKILL_UNTRAINED,
  skill_know: WWN_SKILL_UNTRAINED,
  skill_lead: WWN_SKILL_UNTRAINED,
  skill_magic: WWN_SKILL_UNTRAINED,
  skill_notice: WWN_SKILL_UNTRAINED,
  skill_perform: 2,
  skill_pray: WWN_SKILL_UNTRAINED,
  skill_punch: WWN_SKILL_UNTRAINED,
  skill_ride: WWN_SKILL_UNTRAINED,
  skill_sail: 0,
  skill_shoot: WWN_SKILL_UNTRAINED,
  skill_sneak: WWN_SKILL_UNTRAINED,
  skill_survive: WWN_SKILL_UNTRAINED,
  skill_stab: 0,
  skill_trade: WWN_SKILL_UNTRAINED,
  skill_work: WWN_SKILL_UNTRAINED,
  remaining_skill_points: 0,
  foci: [
    {
      focus_name: 'Diplomatic Grace',
      focus_description: `
    Your skill at personal negotiations is enormous and un- canny. Some might even think it supernatural in nature. Level 1: Gain Convince as a bonus skill. You speak all
the languages common to your region of the world and can learn new ones to a workable level in a week, becoming fluent in a month. Reroll 1s on any skill check dice related to negotiation or diplomacy.
Level 2: Once per day, silently consecrate a bargain; the target must make a Mental save to break the deal unless their life or something they love as much is imperiled by it. Most NPCs won’t even try to break it. The deal must be for something specific and time-limited, and not an open-ended bargain.`,
      focus_level: 2,
    },
    {
      focus_name: 'Polymath',
      focus_description: `
      You have a passing acquaintance with a vast variety of practical skills and pastimes, and can make a modest at- tempt at almost any exercise of skill or artisanry. Note that the phantom skill levels granted by this Focus don’t stack with normal skill levels or give a skill purchase discount. Only Experts or Partial Experts can take this Focus.
      Level 1: Gain any one bonus skill. You treat all non-com- bat skills as if they were at least level-0 for purposes of skill checks, even if you lack them entirely.
      Level 2: You treat all non-combat skills as if they were at least level-1 for purposes of skill checks.
      `,
      focus_level: 1,
    },
  ],
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
  weapons: [
    {
      weapon_name: 'Hand Axe',
      weapon_description: `
    Range: 10/30
Received from Grendor the Horrible
Maybe cursed?

    `,
      weapon_traits: ['t'],
      weapon_shock: '1/AC15',
      weapon_attribute: ['strength', 'dexterity'],
      weapon_encumbrance: 1,
      weapon_readied: true,
      weapon_damage: '1d6',
    },
    {
      weapon_name: 'Throwing Blade',
      weapon_description: 'Range: 30/60',
      weapon_traits: ['t', 's', 'n', 'll'],
      weapon_shock: '',
      weapon_attribute: ['dexterity'],
      weapon_encumbrance: 1,
      weapon_readied: false,
      weapon_damage: '1d4',
    },
  ],
  armors: [
    {
      armor_name: 'Mail Shirt',
      armor_description:
        'Given by Bojang Doldrum; scuffed ad bloodied but solid',
      armor_encumbrance: 1,
      armor_readied: true,
      armor_defense: 14,
      armor_weight: 'medium',
    },
    // {
    //   armor_name: 'Large Shield',
    //   armor_description: 'Emblazoned with family crest',
    //   armor_encumbrance: 1,
    //   armor_readied: true,
    //   armor_defense: 14,
    //   armor_weight: 'shield',
    // },
    // {
    //   armor_name: 'War Robe',
    //   armor_description: '',
    //   armor_encumbrance: 3,
    //   armor_readied: false,
    //   armor_defense: 14,
    //   armor_weight: 'light',
    // },
  ],
  currency_copper: 0,
  currency_silver: 0,
  currency_gold: 0,
};
