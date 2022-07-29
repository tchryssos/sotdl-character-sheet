import { rulebook } from '@prisma/client';

export type RulebookSaveData = Omit<
  rulebook,
  'createdOn' | 'lastModifiedOn' | 'id'
> & {
  id: number | 'new';
};
