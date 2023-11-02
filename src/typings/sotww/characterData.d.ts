import { SotwwName } from './game';

export type SotwwCharacterData = {
  type: SotwwName;
  name: string;
  level: number;
  ancestry: string;
  description: string;
  professions: string;
};
