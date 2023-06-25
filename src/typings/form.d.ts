export interface SortableAddAnotherChildProps {
  onDelete: (index: number) => void;
  sortIndexMap: Map<string, number>;
  fieldId: string;
  postSortIndex: number;
}
