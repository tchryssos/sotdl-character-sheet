/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';

import { Color } from '~/typings/theme';

import { LoadingSpinner } from '../LoadingSpinner';
import { Check } from './Check';
import { Close } from './Close';

export interface StatusIconProps {
  isLoading?: boolean;
  isSuccessful?: boolean;
  hasError?: boolean;
  forceNeutral?: boolean;
  statusOf: string;
  color?: Color;
  className?: string;
}

export const StatusIcon: React.FC<StatusIconProps> = ({
  isLoading,
  isSuccessful,
  hasError,
  forceNeutral,
  statusOf,
  color,
  className,
}) => {
  const [status, setStatus] = useState<
    'neutral' | 'loading' | 'error' | 'success'
  >('neutral');

  const sharedProps = {
    title: `${statusOf} ${status}`,
    titleId: `${statusOf}-${status}`,
    color,
    className,
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
    return <LoadingSpinner {...sharedProps} />;
  }

  if (status === 'error') {
    const closeProps = {
      ...sharedProps,
      color: sharedProps.color || 'danger',
    };
    return <Close {...closeProps} />;
  }

  if (status === 'success') {
    return <Check {...sharedProps} />;
  }

  return null;
};
