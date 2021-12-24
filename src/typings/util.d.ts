// https://stackoverflow.com/a/49402091
export type KeysOfUnion<T> = T extends T ? keyof T : never;
