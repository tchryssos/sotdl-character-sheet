export interface SortableAddAnotherChildProps {
  onDeleteFn: (index: number) => void;
  sortIndexMap: Map<string, number>;
  fieldId: string;
  postSortIndex: number;
}

export type MultiFields<T extends Record<string, unknown>> = {
  [K in keyof T as T[K] extends { fieldName: string } ? K : never]: T[K];
};

export type NestedFieldTypes<T extends Record<string, unknown>> = {
  [K in keyof T as T[K] extends { fieldName: string } | string
    ? never
    : K]: T[K];
};

export type UnnestedFieldTypes<T extends Record<string, unknown>> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};
