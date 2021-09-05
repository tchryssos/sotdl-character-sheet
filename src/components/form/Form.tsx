import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

import { Button } from '~/components/Button';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { FlexBox } from '../box/FlexBox';

interface FormProps {
  onSubmit: () => void;
  submitLabel?: string;
  children: React.ReactNode;
  className?: string;
  defaultValues?: Record<string, string | number | boolean>;
  mode?: 'onSubmit' | 'onBlur' | 'onTouched' | 'onChange';
}

const FormWrapper = styled(FlexBox)`
  width: 100%;
`;

const StyledForm = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Form: React.FC<FormProps> = ({
  onSubmit,
  submitLabel = 'Submit',
  children,
  className,
  defaultValues,
  mode = 'onSubmit',
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode,
  });

  return (
    <FormWrapper center>
      <StyledForm className={className} onSubmit={handleSubmit(onSubmit)}>
        <ReactHookFormContext.Provider value={{ register, watch, errors }}>
          {children}
          <Button label={submitLabel} type="submit" />
        </ReactHookFormContext.Provider>
      </StyledForm>
    </FormWrapper>
  );
};
