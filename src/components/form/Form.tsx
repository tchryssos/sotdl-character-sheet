/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled';
import { FormProvider, useForm } from 'react-hook-form';

import { FlexBox } from '../box/FlexBox';
import { VisibilityContextProvider } from '../providers/VisibilityContextProvider';

type FormProps<T> = {
  onSubmit: (values: T) => void;
  submitLabel?: string;
  children: React.ReactNode;
  className?: string;
  mode?: 'onSubmit' | 'onBlur' | 'onTouched' | 'onChange';
  defaultValues: Partial<T>;
};

const FormWrapper = styled(FlexBox)`
  width: 100%;
`;

const StyledForm = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: ${({ theme }) => theme.spacing[32]};
`;

export function Form<T extends Record<string, unknown>>({
  onSubmit,
  children,
  className,
  mode = 'onSubmit',
  defaultValues,
}: FormProps<T>) {
  const formMethods = useForm({
    defaultValues: defaultValues as Record<string, any>,
    mode,
  });

  return (
    <VisibilityContextProvider>
      <FormWrapper center>
        <StyledForm
          className={className}
          onSubmit={formMethods.handleSubmit(
            onSubmit as (v: { [k: string]: any }) => void
          )}
        >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <FormProvider {...formMethods}>{children}</FormProvider>
        </StyledForm>
      </FormWrapper>
    </VisibilityContextProvider>
  );
}
