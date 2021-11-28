export type ErrorResponse = { error: string };

export type ApiResponse<T> = T | ErrorResponse;
