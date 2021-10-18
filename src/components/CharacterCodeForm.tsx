import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Color } from '~/typings/theme';
import { pxToRem } from '~/utils/styles';

import { FlexBox } from './box/FlexBox';
import { TextButton } from './buttons/TextButton';
import { Label } from './form/Label';
import { TextArea } from './form/TextAreaInput';

const FormWrapper = styled(FlexBox)(({ theme }) => ({
  alignSelf: 'flex-start',
  width: '100%',
  [theme.breakpoints.sm]: {
    width: '75%',
  },
  [theme.breakpoints.lg]: {
    width: '60%',
  },
  [theme.breakpoints.xl]: {
    width: '50%',
  },
}));

const CCInput = styled(TextArea)<{ borderColor: Color | false }>`
  min-height: ${pxToRem(80)};
  width: 100%;
  border-color: ${({ theme, borderColor }) =>
    borderColor && theme.colors[borderColor]};
  outline-color: ${({ theme, borderColor }) =>
    borderColor && theme.colors[borderColor]};
`;

interface UploadFormProps {
  isVisible: boolean;
  className?: string;
}

const uploadName = 'upload_character_code';

export const CharacterCodeForm: React.FC<UploadFormProps> = ({
  isVisible,
  className,
}) => {
  const [value, setValue] = useState('');
  const [hasError, setHasError] = useState(false);
  const { reset } = useFormContext();

  if (!isVisible) {
    return null;
  }

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = () => {
    try {
      const objString = window.atob(value);
      const characterObj: Record<string, unknown> = JSON.parse(objString);
      reset(characterObj);
      setHasError(false);
    } catch (e) {
      setHasError(true);
    }
  };

  return (
    <FormWrapper alignItems="flex-end" className={className} column gap={8}>
      <Label label="Character Code" labelFor={uploadName}>
        <CCInput
          borderColor={hasError && 'danger'}
          name={uploadName}
          value={value}
          onChange={onChange}
        />
      </Label>
      <TextButton
        disabled={!value}
        label="Use Code"
        type="submit"
        onClick={onSubmit}
      />
    </FormWrapper>
  );
};
