import styled from '@emotion/styled';
import { sortBy, startCase } from 'lodash';
import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { EditContext } from '~/logic/contexts/editContext';
import { SortableAddAnotherChildProps } from '~/typings/form';
import { KeyOfListField, ListFieldRecord } from '~/typings/util';

import { Box } from '../box/Box';
import { FlexBox } from '../box/FlexBox';
import { Text } from '../Text';
import { AddAnotherButton } from './AddAnotherButton';

type AddAnotherMultiFieldProps<T extends Record<string, unknown>> = {
  parentFieldName: Extract<keyof ListFieldRecord<T>, string>;
  children: (fieldProps: {
    index: number;
    onDelete: (index: number) => void;
    fieldId: string;
    sortIndexMap: Map<string, number>;
  }) => React.ReactNode;
  createDefaultValue: () => Record<string, unknown>;
  HeaderRow?: React.ComponentType;
  // @TODO Type this so that it knows which properties are available via
  // parentFieldName
  sortProperties?: KeyOfListField<T>[];
  ChildWrapper?: React.ComponentType<PropsWithChildren>;
  simpleDelete?: boolean;
  addLabel?: string;
  emptyLabel?: string;
  filterFn?: (props: SortableAddAnotherChildProps) => boolean;
};

const ChildContainer = styled(Box)`
  max-width: 100%;
  overflow: hidden;
`;

function EmptyChildWrapper({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export function AddAnotherMultiField<T extends Record<string, unknown>>({
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
}: AddAnotherMultiFieldProps<T>) {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: parentFieldName as string,
  });
  const parentField: Record<string, unknown>[] | undefined =
    watch(parentFieldName);

  const { isEditMode } = useContext(EditContext);

  // https://github.com/react-hook-form/react-hook-form/discussions/4264#discussioncomment-398509
  const [sortIndexMap, setSortIndexMap] = useState(
    new Map(fields.map(({ id }, index) => [id, index]))
  );

  useEffect(() => {
    if (fields.length !== sortIndexMap.size) {
      setSortIndexMap(new Map(fields.map(({ id }, index) => [id, index])));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  let controlledFields = fields.map((field, i) => ({
    ...field,
    ...parentField?.[i],
  }));

  if (sortProperties) {
    controlledFields = sortBy(controlledFields, sortProperties);
  }

  const onCreate = () => {
    const nextValue = createDefaultValue();
    append(nextValue);
  };

  const onDelete = (index: number) => {
    const removedId = controlledFields[index].id;
    const valueRemovedIndex = sortIndexMap.get(removedId)!;

    remove(valueRemovedIndex);
  };

  return (
    <>
      {isEditMode && (
        <FlexBox gap={16}>
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
            fieldId: field.id,
            sortIndexMap,
          };

          if (filterFn?.({ ...props, postSortIndex: i }) === false) {
            return [];
          }

          return [
            <ChildContainer key={field.id}>{children(props)}</ChildContainer>,
          ];
        })}
      </ChildWrapper>
      {!controlledFields.length && (
        <Text as="p" fontStyle="italic" variant="body-sm">
          {emptyLabel ||
            `Empty (use edit mode to add some ${startCase(parentFieldName)})`}
        </Text>
      )}
    </>
  );
}
