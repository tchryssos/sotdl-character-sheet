import styled from '@emotion/styled';
import startCase from 'lodash.startcase';
import { useContext } from 'react';

import { TextInputProps } from '~/components/form/typings';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { Label } from './Label';

export const TextArea = styled.textarea(({ theme }) => ({
  minHeight: theme.spacing[48],
  fontSize: theme.fontSize.body,
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
}) => {
  const { register } = useContext(ReactHookFormContext);
  return (
    <Label label={hideLabel ? '' : label || startCase(name)} labelFor={name}>
      <TextArea
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register?.(name, validations)}
        className={className}
        disabled={disabled}
        readOnly={readOnly}
      />
    </Label>
  );
};
