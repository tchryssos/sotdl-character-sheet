import { character } from '@prisma/client';
import { ErrorResponse } from './api';
import { SotdlCharacterData } from './sotdl/characterData';

export type CharacterSaveData = Omit<
  character,
  'createdOn' | 'lastModifiedOn' | 'id'
> & {
  id: number | 'new';
};

export type CharacterData = SotdlCharacterData;

export type StrictCharacter = Omit<character, 'characterData'> & {
  characterData: CharacterData;
};
