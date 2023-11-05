import { CharacterData } from '~/typings/characters';
import { ListFieldRecord } from '~/typings/util';

export function makeNestedFieldNameFn<
  T extends CharacterData,
  U extends Extract<keyof ListFieldRecord<T>, string>
>(parentFieldName: U) {
  return (
    // @ts-expect-error T[U][number] is always valid
    // TS can't keep track of the fact that name will ALWAYS be the
    // keyof an object from an array field; the error is
    // "cannot use number to index" T[U], which we know
    // will work.
    name: Extract<keyof T[U][number], string>,
    index: number
    // @ts-expect-error T[U][number] is always valid
  ): `${U}.${number}.${Extract<keyof T[U][number], string>}` =>
    `${parentFieldName}.${index}.${name}`;
}
