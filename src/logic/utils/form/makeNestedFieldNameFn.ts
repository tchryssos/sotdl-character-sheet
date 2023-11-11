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

export function makeDoubleNestedFieldNameFn<
  T extends CharacterData,
  // for ex. "armors" as in CharacterData.armors
  U extends Extract<keyof ListFieldRecord<T>, string>,
  // for ex. "armor_defense_value" as in CharacterData.armors[0].armor_defense_value
  // @ts-expect-error T[U][number] is always valid
  V extends Extract<keyof ListFieldRecord<T[U][number]>, string>
>(grandParentFieldName: U, parentFieldName: V) {
  return (
    parentIndex: number,
    fieldName: Extract<
      // @ts-expect-error T[U][number][V][number] is always valid
      keyof T[typeof grandParentFieldName][number][typeof parentFieldName][number],
      string
    >,
    index: number
  ): `${U}.${number}.${V}.${number}.${Extract<
    // @ts-expect-error T[U][number][V][number] is always valid
    keyof T[U][number][V][number],
    string
  >}` =>
    `${grandParentFieldName}.${parentIndex}.${parentFieldName}.${index}.${fieldName}`;
}
