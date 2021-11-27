import { useContext, useEffect } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';

import { EditContext } from '~/logic/contexts/editContext';

import { Box } from '../box/Box';
import { SubBody } from '../typography/SubBody';
import { AddAnotherButton } from './AddAnotherButton';

interface AddAnotherMultiFieldProps {
  parentFieldName: string;
  children: (fieldProps: {
    index: number;
    onDelete: (index: number) => void;
  }) => React.ReactNode;
  createDefaultValue?: () => Record<string, unknown>;
  HeaderRow?: React.FC;
}

export const AddAnotherMultiField: React.FC<AddAnotherMultiFieldProps> = ({
  parentFieldName,
  children,
  createDefaultValue,
  HeaderRow,
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

  const controlledFields = fields.map((field, i) => ({
    ...field,
    ...parentField?.[i],
  }));

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
