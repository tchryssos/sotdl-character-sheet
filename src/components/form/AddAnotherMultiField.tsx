import styled from '@emotion/styled';
import { useContext } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { Button } from '~/components/Button';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { Box } from '../box/Box';

const AddFieldButton = styled(Button)`
  max-width: ${({ theme }) => theme.spacing[128]};
  max-height: ${({ theme }) => theme.spacing[40]};
`;

interface AddAnotherMultiFieldProps {
  parentFieldName: string;
  children: (fieldProps: {
    index: number;
    onDelete: (index: number) => void;
  }) => React.ReactNode;
  createDefaultValue?: () => Record<string, unknown>;
  HeaderRow: React.FC;
}

export const AddAnotherMultiField: React.FC<AddAnotherMultiFieldProps> = ({
  parentFieldName,
  children,
  createDefaultValue,
  HeaderRow,
}) => {
  const { control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: parentFieldName,
  });
  const { watch, setValue } = useContext(ReactHookFormContext);

  const parentField: Record<string, unknown>[] = watch?.(parentFieldName);

  const controlledFields = fields.map((field, i) => ({
    ...field,
    ...parentField?.[i],
  }));

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
      <AddFieldButton label="+" onClick={onCreate} />
      {Boolean(controlledFields?.length) && <HeaderRow />}
      {controlledFields.map((field, i) => (
        <Box key={field.id}>
          {children({
            index: i,
            onDelete,
          })}
        </Box>
      ))}
    </>
  );
};
