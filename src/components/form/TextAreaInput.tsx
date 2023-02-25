import styled from '@emotion/styled';
import { TextareaAutosize } from '@mui/base';
import startCase from 'lodash.startcase';
import { useFormContext } from 'react-hook-form';

import { TextInputProps } from '~/components/form/typings';
import { useIsEditingLocked } from '~/logic/hooks/useIsEditingLocked';
import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { Label } from './Label';

const defaultHeight = 40;

export const TextArea = styled(TextareaAutosize)<{ height?: number }>(
  ({ theme, height }) => ({
    height: pxToRem(height || defaultHeight),
    minHeight: theme.spacing[40],
    fontSize: theme.fontSize.subBody,
    width: '100%',
    padding: `${theme.spacing[4]} ${theme.spacing[8]}`,
    fontFamily: theme.fontFamily.normal,
    resize: 'vertical',
  })
);

export function TextAreaInput<T extends Record<string, unknown>>({
  label,
  name,
  readOnly,
  className,
  disabled,
  validations,
  hideLabel,
  alwaysEditable,
}: Omit<TextInputProps<T>, 'type'>) {
  const { register } = useFormContext();

  const nonEditLocked = useIsEditingLocked(Boolean(alwaysEditable));

  return (
    <Label label={hideLabel ? '' : label || startCase(name)} labelFor={name}>
      <TextArea
        className={className}
        disabled={disabled}
        readOnly={readOnly || nonEditLocked}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(name, validations)}
      />
    </Label>
  );
}
