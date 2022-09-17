import { rulebook } from '@prisma/client';

import { createRulebookApiRoute } from '~/constants/routing/api';
import { NEW_ID } from '~/constants/routing/shared';

export type NewRulebook = Omit<rulebook, 'id' | 'createdOn' | 'lastModifiedOn'>;

type GetRulebook = {
  id: string | number;
  rulebook?: never;
  method: 'GET';
};

type PostRulebook = {
  id?: never;
  rulebook: NewRulebook;
  method: 'POST';
};

type PatchRulebook = {
  id: string | number;
  rulebook: rulebook;
  method: 'PATCH';
};

type RulebookFetchParams = GetRulebook | PostRulebook | PatchRulebook;

export const fetchRulebook = async (params: RulebookFetchParams) => {
  try {
    const resp = await fetch(createRulebookApiRoute(params.id || NEW_ID), {
      method: params.method,
      body:
        params.method !== 'GET' ? JSON.stringify(params.rulebook) : undefined,
    });
    const respData = await resp.json();

    return respData;
  } catch (e) {
    return { error: 'Something went wrong with your Rulebook request' };
  }
};
