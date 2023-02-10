import { character } from '@prisma/client';
import { ErrorResponse } from './api';
import { RulebookType } from './rulebooks';
import { SotdlCharacterData } from './sotdl/characterData';

export type CharacterSaveData = Omit<
  character,
  'createdOn' | 'lastModifiedOn' | 'id' | 'deleted'
> & {
  id: number | 'new';
};

export type CharacterData = SotdlCharacterData;

export type StrictCharacter = Omit<
  character,
  'characterData' | 'rulebookName'
> & {
  characterData: CharacterData;
  rulebookName: RulebookType;
};
