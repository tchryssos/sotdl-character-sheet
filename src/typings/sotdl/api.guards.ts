import { ApiResponse, ErrorResponse } from '../api';

export const isErrorResponse = (
  resp: ApiResponse<unknown>
): resp is ErrorResponse => (resp as ErrorResponse)?.error !== undefined;
