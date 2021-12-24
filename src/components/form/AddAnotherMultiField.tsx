import styled from '@emotion/styled';
import sortBy from 'lodash.sortby';
import { useContext, useEffect } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';

import { FieldNames } from '~/constants/form';
import { EditContext } from '~/logic/contexts/editContext';
import { KeysOfUnion } from '~/typings/util';

import { Box } from '../box/Box';
import { SubBody } from '../typography/SubBody';
import { AddAnotherButton } from './AddAnotherButton';

type MultiFields = {
  [K in keyof FieldNames as FieldNames[K] extends Record<string, string>
    ? K
    : never]: FieldNames[K];
};

interface AddAnotherMultiFieldProps {
  parentFieldName: keyof MultiFields;
  children: (fieldProps: {
    index: number;
    onDelete: (index: number) => void;
  }) => React.ReactNode;
  createDefaultValue?: () => Record<string, unknown>;
  HeaderRow?: React.FC;
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

  if (sortProperties) {
    controlledFields = sortBy(controlledFields, sortProperties);
  }

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
