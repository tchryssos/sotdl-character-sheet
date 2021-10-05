import styled from '@emotion/styled';
import { FormProvider, useForm } from 'react-hook-form';

import { DEFAULT_VALUES } from '~/constants/form';

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
  children,
  className,
  mode = 'onSubmit',
}) => {
  const formMethods = useForm({
    defaultValues: DEFAULT_VALUES,
    mode,
  });
  return (
    <FormWrapper center>
      <StyledForm
        className={className}
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <FormProvider {...formMethods}>{children}</FormProvider>
      </StyledForm>
    </FormWrapper>
  );
};
