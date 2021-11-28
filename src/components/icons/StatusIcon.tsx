/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';

import { Color } from '~/typings/theme';

import { LoadingSpinner } from '../LoadingSpinner';
import { Check } from './Check';
import { Close } from './Close';

export type LoadingStatus = 'neutral' | 'loading' | 'error' | 'success';

export interface StatusIconProps {
  isLoading?: boolean;
  isSuccessful?: boolean;
  hasError?: boolean;
  isNeutral?: boolean;
  statusOf: string;
  color?: Color;
  className?: string;
}

export const StatusIcon: React.FC<StatusIconProps> = ({
  isLoading,
  isSuccessful,
  hasError,
  isNeutral,
  statusOf,
  color,
  className,
}) => {
  const [status, setStatus] = useState<LoadingStatus>('neutral');

  const sharedProps = {
    title: `${statusOf} ${status}`,
    titleId: `${statusOf}-${status}`,
    color,
    className,
  };

  useEffect(() => {
    if (isLoading && !isNeutral) {
      setStatus('loading');
    }
  }, [isLoading, isNeutral]);

  useEffect(() => {
    if (hasError && !isNeutral) {
      setStatus('error');
    }
  }, [hasError, isNeutral]);

  useEffect(() => {
    if (isSuccessful && !isNeutral) {
      setStatus('success');
    }
  }, [isSuccessful, isNeutral]);

  useEffect(() => {
    if (isNeutral) {
      setStatus('neutral');
    }
  }, [isNeutral]);

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
