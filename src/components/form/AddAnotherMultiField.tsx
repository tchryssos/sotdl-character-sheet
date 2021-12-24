import styled from '@emotion/styled';
import sortBy from 'lodash.sortby';
import { useContext, useEffect, useMemo } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';

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
  createDefaultValue?: () => Record<string, unknown>;
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
  const { control } = useForm();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: parentFieldName,
  });
  const { watch, setValue } = useFormContext();
  const { isEditMode } = useContext(EditContext);

  const parentField: Record<string, unknown>[] | undefined =
    watch(parentFieldName);

  let controlledFields = fields.map((field, i) => ({
    ...field,
    ...parentField?.[i],
  }));

  // START - SORT - START
  if (sortProperties) {
    controlledFields = sortBy(controlledFields, sortProperties);
  }

  // https://github.com/react-hook-form/react-hook-form/discussions/4264#discussioncomment-398509
  const sortIndexMap = useMemo(
    () => new Map(fields.map(({ id }, index) => [id, index])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fields.length]
  );
  // END - SORT - END

  useEffect(() => {
    if (parentField && parentField.length > controlledFields.length) {
      replace(parentField);
    }
  }, [parentField, controlledFields, replace]);

  const onCreate = () => {
    const nextValue = createDefaultValue?.() || {};
    append(nextValue);
  };

  const onDelete = (index: number) => {
    const nextFields = controlledFields;
    nextFields.splice(index, 1);
    setValue(parentFieldName, nextFields);
    remove(index);
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
