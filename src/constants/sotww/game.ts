export const ATTRIBUTES = ['strength', 'agility', 'intellect', 'will'] as const;
export type SotwwAttribute = (typeof ATTRIBUTES)[number];

export const PATH_TYPES = ['novice', 'expert', 'master'] as const;
export type SotwwPathType = (typeof PATH_TYPES)[number];
