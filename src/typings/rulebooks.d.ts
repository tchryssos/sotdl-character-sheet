import { rulebook } from '@prisma/client';

export type RulebookType = 'swn' | 'sotdl' | 'wwn' | 'sotww' | 'cwn';

export type RulebookSaveData = Omit<
  rulebook,
  'createdOn' | 'lastModifiedOn' | 'id'
> & {
  id: number | 'new';
};

export type StrictRulebook = Omit<rulebook, 'name'> & {
  name: RulebookType;
};
