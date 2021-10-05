import styled from '@emotion/styled';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { DEFAULT_VALUES } from '~/constants/form';
import { EditContext } from '~/logic/contexts/editContext';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { FlexBox } from '../box/FlexBox';
import { TextButton } from '../buttons/TextButton';

interface FormProps {
  onSubmit: () => void;
  submitLabel?: string;
  children: React.ReactNode;
  className?: string;
  mode?: 'onSubmit' | 'onBlur' | 'onTouched' | 'onChange';
}

const FormWrapper = styled(FlexBox)`
  width: 100%;
`;

const StyledForm = styled.form`
  padding: ${({ theme }) => theme.spacing[16]};
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: ${({ theme }) => theme.spacing[32]};
  ${({ theme }) => theme.breakpoints.sm} {
    padding: ${({ theme }) => theme.spacing[32]};
  }
`;

export const Form: React.FC<FormProps> = ({
  onSubmit,
  submitLabel = 'Submit',
  children,
  className,
  mode = 'onSubmit',
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    mode,
  });
  const isEditMode = useContext(EditContext);

  return (
    <FormWrapper center>
      <StyledForm className={className} onSubmit={handleSubmit(onSubmit)}>
        <ReactHookFormContext.Provider
          value={{ register, watch, errors, setValue }}
        >
          {children}
          {isEditMode && <TextButton label={submitLabel} type="submit" />}
        </ReactHookFormContext.Provider>
      </StyledForm>
    </FormWrapper>
  );
};
