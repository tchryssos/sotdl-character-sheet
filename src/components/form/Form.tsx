/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled';
import { FormProvider, useForm } from 'react-hook-form';

import { Box } from '../box/Box';
import { FlexBox } from '../box/FlexBox';
import { VisibilityContextProvider } from '../providers/VisibilityContextProvider';

type FormProps<T> = {
  onSubmit: (values: T) => void;
  submitLabel?: string;
  children: React.ReactNode;
  className?: string;
  mode?: 'onSubmit' | 'onBlur' | 'onTouched' | 'onChange';
  defaultValues: Partial<T>;
  noStyles?: boolean;
};

const FormWrapper = styled(FlexBox)`
  width: 100%;
`;

const StyledForm = styled.form<Pick<FormProps<any>, 'noStyles'>>(
  ({ noStyles, theme }) => ({
    width: '100%',
    display: noStyles ? '' : 'grid',
    gridTemplateColumns: noStyles ? '' : '1fr',
    rowGap: noStyles ? '' : theme.spacing['48'],
  })
);

export const FormBox = StyledForm.withComponent(Box);

export function Form<T extends Record<string, unknown>>({
  onSubmit,
  children,
  className,
  mode = 'onSubmit',
  defaultValues,
  noStyles,
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
          noStyles={noStyles}
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
