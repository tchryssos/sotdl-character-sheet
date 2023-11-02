export const ATTRIBUTES = ['strength', 'agility', 'intellect', 'will'] as const;
export type SotwwAttribute = (typeof ATTRIBUTES)[number];
