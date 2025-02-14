import { character } from '@prisma/client';
import { ErrorResponse } from './api';
import { RulebookType } from './rulebooks';
import { SotdlCharacterData } from './sotdl/characterData';
import { WwnCharacterData } from './wwn/characterData';
import { SotwwCharacterData } from './sotww/characterData';
import { CwnCharacterData } from './cwn/characterData';

export type CharacterSaveData = Omit<
  character,
  'createdOn' | 'lastModifiedOn' | 'id' | 'deleted' | 'inactive'
> & {
  id: number | 'new';
};

export type CharacterData =
  | SotdlCharacterData
  | WwnCharacterData
  | SotwwCharacterData
  | CwnCharacterData;

// https://sine-nomine-publishing.myshopify.com/
// Crawford games
export type SineNomineCharacterData = WwnCharacterData | CwnCharacterData;

export type StrictCharacter<T extends CharacterData> = Omit<
  character,
  'characterData' | 'rulebookName'
> & {
  characterData: T;
  rulebookName: RulebookType;
};

export interface LastSaved {
  auto: boolean;
  on: Date;
}
