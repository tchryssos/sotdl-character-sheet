export type SwnClassBenefit = {
  description: string;
};

export type SwnCharacterData = {
  type: 'swn';
  name: string;
  level: number;
  background: string;
  background_description: string;
  class: string;
  class_benefits: SwnClassBenefit[];
};
