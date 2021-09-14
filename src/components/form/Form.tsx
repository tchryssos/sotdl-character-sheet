import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

import { Button } from '~/components/Button';
import { DEFAULT_VALUES } from '~/constants/form';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { FlexBox } from '../box/FlexBox';

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
  padding: ${({ theme }) => theme.spacing[32]};
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: ${({ theme }) => theme.spacing[16]};
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

  return (
    <FormWrapper center>
      <StyledForm className={className} onSubmit={handleSubmit(onSubmit)}>
        <ReactHookFormContext.Provider
          value={{ register, watch, errors, setValue }}
        >
          {children}
          <Button label={submitLabel} type="submit" />
        </ReactHookFormContext.Provider>
      </StyledForm>
    </FormWrapper>
  );
};
