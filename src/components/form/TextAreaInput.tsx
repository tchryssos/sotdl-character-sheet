import styled from '@emotion/styled';
import startCase from 'lodash.startcase';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { TextInputProps } from '~/components/form/typings';
import { EditContext } from '~/logic/contexts/editContext';

import { Label } from './Label';

export const TextArea = styled.textarea(({ theme }) => ({
  height: theme.spacing[40],
  minHeight: theme.spacing[40],
  fontSize: theme.fontSize.subBody,
  width: '100%',
  padding: `${theme.spacing[4]} ${theme.spacing[8]}`,
  fontFamily: theme.fontFamily.normal,
  resize: 'vertical',
  '-webkit-resizer': {
    height: 40,
    width: 40,
  },
}));

export const TextAreaInput: React.FC<Omit<TextInputProps, 'type'>> = ({
  label,
  name,
  readOnly,
  className,
  disabled,
  validations,
  hideLabel,
  alwaysEditable,
}) => {
  const { register } = useFormContext();
  const { isEditMode } = useContext(EditContext);
  const nonEditLocked = !isEditMode && !alwaysEditable;
  return (
    <Label label={hideLabel ? '' : label || startCase(name)} labelFor={name}>
      <TextArea
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(name, validations)}
        className={className}
        disabled={disabled}
        readOnly={readOnly || nonEditLocked}
      />
    </Label>
  );
};
