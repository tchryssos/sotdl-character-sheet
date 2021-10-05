import { useContext } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { EditContext } from '~/logic/contexts/editContext';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { Box } from '../box/Box';
import { IconButton } from '../buttons/IconButton';
import { Plus } from '../icons/Plus';
import { SubBody } from '../typography/SubBody';

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
  const isEditMode = useContext(EditContext);

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
      {isEditMode && (
        <IconButton onClick={onCreate}>
          <Plus title="Add another plus" titleId="add-another-plus-icon" />
        </IconButton>
      )}
      {Boolean(controlledFields?.length) && <HeaderRow />}
      {controlledFields.map((field, i) => (
        <Box key={field.id}>
          {children({
            index: i,
            onDelete,
          })}
        </Box>
      ))}
      {!controlledFields.length && (
        <SubBody italic>
          Empty (use edit mode to add some {parentFieldName})
        </SubBody>
      )}
    </>
  );
};
