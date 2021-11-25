import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { DEFAULT_VALUES } from '~/constants/form';
import { NEW_CHARACTER_ID } from '~/constants/routing';

interface ResetIntermediaryProps {
  setIsLoading?: (isLoading: boolean) => void;
}

export const ResetIntermediary: React.FC<ResetIntermediaryProps> = ({
  setIsLoading,
}) => {
  const {
    query: { id },
    push,
  } = useRouter();
  const { reset } = useFormContext();

  useEffect(() => {
    if (id === NEW_CHARACTER_ID) {
      reset(DEFAULT_VALUES);
    } else {
      // const onLoad = async () => {};
      // onLoad();
    }
  }, [id, reset]);

  return null;
};
