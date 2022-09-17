import { character } from '@prisma/client';

import { ApiResponse } from './api';

// export const isSuccessfulProfileResponse = (
//   resp: ApiResponse<User>
// ): resp is User => (resp as User).id !== undefined;

export const isSuccessfulUserCharactersResponse = (
  resp: ApiResponse<character[]>
): resp is character[] => (resp as character[]).length !== undefined;
