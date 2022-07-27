import { character } from '@prisma/client';
import { ErrorResponse } from './api';

export type CharacterSaveData = Omit<
  character,
  'createdOn' | 'lastModifiedOn' | 'id'
> & {
  id: number | 'new';
};

export type StrictCharacter = Omit<character> & {
  characterData: Record<string, string>;
};
