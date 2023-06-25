import { character } from '@prisma/client';
import { ErrorResponse } from './api';
import { RulebookType } from './rulebooks';
import { SotdlCharacterData } from './sotdl/characterData';
import { WwnCharacterData } from './wwn/characterData';

export type CharacterSaveData = Omit<
  character,
  'createdOn' | 'lastModifiedOn' | 'id' | 'deleted'
> & {
  id: number | 'new';
};

export type CharacterData = SotdlCharacterData | WwnCharacterData;

export type StrictCharacter<T extends CharacterData> = Omit<
  character,
  'characterData' | 'rulebookName'
> & {
  characterData: T;
  rulebookName: RulebookType;
};
