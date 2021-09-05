import { useForm } from 'react-hook-form';

import { Button } from '~/components/Button';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

interface FormProps {
  onSubmit: () => void;
  submitLabel?: string;
  children: React.ReactNode;
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
      <ReactHookFormContext.Provider value={{ register, watch, errors }}>
        {children}
        <Button label={submitLabel} type="submit" />
      </ReactHookFormContext.Provider>
    </form>
  );
};
