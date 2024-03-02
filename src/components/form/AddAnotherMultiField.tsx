import styled from '@emotion/styled';
import { sortBy, startCase } from 'lodash';
import {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { EditContext } from '~/logic/contexts/editContext';
import { SortableAddAnotherChildProps } from '~/typings/form';
import { KeyOfListField, ListFieldRecord } from '~/typings/util';

import { Box } from '../box/Box';
import { FlexBox } from '../box/FlexBox';
import { Text } from '../Text';
import { AddAnotherButton } from './AddAnotherButton';

export type AddAnotherMultiFieldName<T extends Record<string, unknown>> =
  Extract<keyof ListFieldRecord<T>, string>;

export interface FieldArrayManipMethods<T extends Record<string, unknown>> {
  onCreate: (nextValueOverride?: T) => void;
  onDelete: (index: number) => void;
}

type AddAnotherMultiFieldProps<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>
> = {
  parentFieldName: AddAnotherMultiFieldName<T>;
  children: (fieldProps: {
    index: number;
    onDelete: (index: number) => void;
    fieldId: string;
    sortIndexMap: Map<string, number>;
  }) => React.ReactNode;
  createDefaultValue: () => U;
  HeaderRow?: React.ComponentType;
  // @TODO Type this so that it knows which properties are available via
  // parentFieldName
  sortProperties?: KeyOfListField<T>[];
  ChildWrapper?: React.ComponentType<PropsWithChildren>;
  simpleDelete?: boolean;
  addLabel?: string;
  emptyLabel?: string | null;
  filterFn?: (props: SortableAddAnotherChildProps) => boolean;
  alwaysEditable?: boolean;
  onAdd?: (index?: number) => void;
  setFieldArrayMethods?: (methods: FieldArrayManipMethods<U>) => void;
};

const ChildContainer = styled(Box)`
  max-width: 100%;
  overflow: hidden;
`;

function EmptyChildWrapper({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

const FIELD_ID = 'fieldId';

export function AddAnotherMultiField<
  T extends Record<string, unknown>,
  U extends Record<string, unknown> = Record<string, unknown>
>({
  parentFieldName,
  children,
  createDefaultValue,
  HeaderRow,
  sortProperties,
  ChildWrapper = EmptyChildWrapper,
  simpleDelete,
  addLabel,
  emptyLabel,
  filterFn,
  alwaysEditable,
  onAdd,
  setFieldArrayMethods,
}: AddAnotherMultiFieldProps<T, U>) {
  const { control, watch } = useFormContext();
  const methods = useFieldArray({
    control,
    name: parentFieldName as string,
    keyName: FIELD_ID,
  });

  const { fields, append, remove } = methods;

  const parentField: Record<string, unknown>[] | undefined =
    watch(parentFieldName);

  const { isEditMode } = useContext(EditContext);

  // https://github.com/react-hook-form/react-hook-form/discussions/4264#discussioncomment-398509
  const [sortIndexMap, setSortIndexMap] = useState(
    new Map(fields.map(({ fieldId }, index) => [fieldId, index]))
  );

  useEffect(() => {
    if (fields.length !== sortIndexMap.size) {
      setSortIndexMap(
        new Map(fields.map(({ fieldId }, index) => [fieldId, index]))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  const controlledFields = useMemo(() => {
    const defaultSorted = fields.map((field, i) => ({
      ...field,
      ...(parentField?.[i] || {}),
    }));
    return sortBy(defaultSorted, sortProperties || []);
  }, [fields, parentField, sortProperties]);

  const onCreate = useCallback(
    (nextValueOverride?: ReturnType<typeof createDefaultValue>) => {
      const nextValue = nextValueOverride || createDefaultValue();
      append(nextValue);
      onAdd?.(controlledFields.length - 1);
    },
    [append, controlledFields.length, createDefaultValue, onAdd]
  );

  const onDelete = useCallback(
    (index: number) => {
      const removedId = controlledFields[index][FIELD_ID];
      const valueRemovedIndex = sortIndexMap.get(removedId)!;

      remove(valueRemovedIndex);
    },
    [controlledFields, remove, sortIndexMap]
  );

  useEffect(() => {
    /**
     * Occasionally we want to manipulate the field array from outside
     * this input. This enables us to share the field array methods with
     * a context provider, etc
     */
    setFieldArrayMethods?.({
      onCreate,
      onDelete,
    });
  }, [onCreate, onDelete, setFieldArrayMethods]);

  return (
    <>
      {(isEditMode || alwaysEditable) && (
        <FlexBox gap={16} width="100%">
          <AddAnotherButton label={addLabel} onClick={onCreate} />
          {simpleDelete && (
            <AddAnotherButton
              label="-"
              onClick={() => onDelete(controlledFields.length - 1)}
            />
          )}
        </FlexBox>
      )}
      {Boolean(controlledFields.length) && HeaderRow && <HeaderRow />}
      <ChildWrapper>
        {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap#for_adding_and_removing_items_during_a_map */}
        {controlledFields.flatMap((field, i) => {
          const props = {
            index: i,
            onDelete,
            fieldId: field[FIELD_ID],
            sortIndexMap,
          };

          if (filterFn?.({ ...props, postSortIndex: i }) === false) {
            return [];
          }

          return [
            <ChildContainer key={field[FIELD_ID]}>
              {children(props)}
            </ChildContainer>,
          ];
        })}
      </ChildWrapper>
      {!controlledFields.length && emptyLabel !== null && (
        <Text as="p" fontStyle="italic" variant="body-sm">
          {emptyLabel ||
            `Empty (use edit mode to add some ${startCase(parentFieldName)})`}
        </Text>
      )}
    </>
  );
}
