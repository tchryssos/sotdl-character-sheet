import { ApiResponse } from './api';
import { User } from './user';

export const isSuccessfulProfileResponse = (
  resp: ApiResponse<User>
): resp is User => (resp as User).id !== undefined;
