import styled from '@emotion/styled';
import sortBy from 'lodash.sortby';
import { useContext, useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { FieldNames } from '~/constants/form';
import { EditContext } from '~/logic/contexts/editContext';

import { Box } from '../box/Box';
import { SubBody } from '../typography/SubBody';
import { AddAnotherButton } from './AddAnotherButton';

type MultiFields = {
  [K in keyof FieldNames as FieldNames[K] extends { fieldName: string }
    ? K
    : never]: FieldNames[K];
};

interface AddAnotherMultiFieldProps {
  parentFieldName: MultiFields[keyof MultiFields]['fieldName'];
  children: (fieldProps: {
    index: number;
    onDelete: (index: number) => void;
    fieldId: string;
    sortIndexMap: Map<string, number>;
  }) => React.ReactNode;
  createDefaultValue: () => Record<string, unknown>;
  HeaderRow?: React.FC;
  // @TODO Type this so that it knows which properties are available via
  // parentFieldName
  sortProperties?: string[];
}

const ChildContainer = styled(Box)`
  max-width: 100%;
`;

export const AddAnotherMultiField: React.FC<AddAnotherMultiFieldProps> = ({
  parentFieldName,
  children,
  createDefaultValue,
  HeaderRow,
  sortProperties,
}) => {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: parentFieldName,
  });
  const parentField: Record<string, unknown>[] | undefined =
    watch(parentFieldName);

  const { isEditMode } = useContext(EditContext);

  // https://github.com/react-hook-form/react-hook-form/discussions/4264#discussioncomment-398509
  const [sortIndexMap, setSortIndexMap] = useState(
    new Map(fields.map(({ id }, index) => [id, index]))
  );

  useEffect(() => {
    if (fields.length > sortIndexMap.size) {
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

    const nextMap = new Map(sortIndexMap);
    nextMap.delete(removedId);
    // eslint-disable-next-line no-restricted-syntax
    for (const [mapId, mapIndex] of nextMap.entries()) {
      if (mapIndex > valueRemovedIndex) {
        nextMap.set(mapId, mapIndex - 1);
      }
    }

    const nextValue = [...(parentField || [])];
    nextValue.splice(valueRemovedIndex, 1);

    setSortIndexMap(nextMap);
    remove(valueRemovedIndex);
  };

  return (
    <>
      {isEditMode && <AddAnotherButton onClick={onCreate} />}
      {Boolean(controlledFields.length) && HeaderRow && <HeaderRow />}
      {controlledFields.map((field, i) => (
        <ChildContainer key={field.id}>
          {children({
            index: i,
            onDelete,
            fieldId: field.id,
            sortIndexMap,
          })}
        </ChildContainer>
      ))}
      {!controlledFields.length && (
        <SubBody italic>
          Empty (use edit mode to add some {parentFieldName})
        </SubBody>
      )}
    </>
  );
};
