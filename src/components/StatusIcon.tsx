/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';

import { Check } from './icons/Check';
import { Close } from './icons/Close';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonStatusProps {
  isLoading?: boolean;
  isSuccessful?: boolean;
  hasError?: boolean;
  forceNeutral?: boolean;
  statusOf: string;
}

export const ButtonStatus: React.FC<ButtonStatusProps> = ({
  isLoading,
  isSuccessful,
  hasError,
  forceNeutral,
  statusOf,
}) => {
  const [status, setStatus] = useState<
    'neutral' | 'loading' | 'error' | 'success'
  >('neutral');

  const titleProps = {
    title: `${statusOf} ${status}`,
    titleId: `${statusOf}-${status}`,
  };

  useEffect(() => {
    if (isLoading && !forceNeutral) {
      setStatus('loading');
    }
  }, [isLoading, forceNeutral]);

  useEffect(() => {
    if (hasError && !forceNeutral) {
      setStatus('error');
    }
  }, [hasError, forceNeutral]);

  useEffect(() => {
    if (isSuccessful && !forceNeutral) {
      setStatus('success');
    }
  }, [isSuccessful, forceNeutral]);

  useEffect(() => {
    if (forceNeutral) {
      setStatus('neutral');
    }
  }, [forceNeutral]);

  if (status === 'loading') {
    return <LoadingSpinner {...titleProps} />;
  }

  if (status === 'error') {
    return <Close color="danger" {...titleProps} />;
  }

  if (status === 'success') {
    return <Check {...titleProps} />;
  }

  return null;
};
