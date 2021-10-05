import styled from '@emotion/styled';
import startCase from 'lodash.startcase';
import { useContext } from 'react';

import { TextInputProps } from '~/components/form/typings';
import { EditContext } from '~/logic/contexts/editContext';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { Label } from './Label';

export const TextArea = styled.textarea(({ theme }) => ({
  height: theme.spacing[40],
  minHeight: theme.spacing[40],
  fontSize: theme.fontSize.subBody,
  width: '100%',
  padding: theme.spacing[8],
  fontFamily: theme.fontFamily,
  resize: 'vertical',
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
  const { register } = useContext(ReactHookFormContext);
  const isEditMode = useContext(EditContext);
  return (
    <Label label={hideLabel ? '' : label || startCase(name)} labelFor={name}>
      <TextArea
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register?.(name, validations)}
        className={className}
        disabled={disabled || (!isEditMode && !alwaysEditable)}
        readOnly={readOnly}
      />
    </Label>
  );
};
