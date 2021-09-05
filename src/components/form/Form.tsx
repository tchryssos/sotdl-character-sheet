import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '~/components/Button';
import { RHFErrors, RHFRegister, RHFWatch } from '~/typings/form';

interface FormProps {
  onSubmit: () => void;
  submitLabel?: string;
  children: (renderProps: {
    register: RHFRegister;
    errors: RHFErrors;
    watch: RHFWatch;
  }) => ReactElement;
  className?: string;
  defaultValues?: Record<string, string | number | boolean>;
  mode?: 'onSubmit' | 'onBlur' | 'onTouched' | 'onChange';
}

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
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      {children({ register, errors, watch })}
      <Button label={submitLabel} type="submit" />
    </form>
  );
};
