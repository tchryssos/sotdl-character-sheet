import { character } from '@prisma/client';

import { ApiResponse } from './api';

export const isSuccessfulCharacterResponse = (
  resp: ApiResponse<character>
): resp is character => (resp as character).id !== undefined;
