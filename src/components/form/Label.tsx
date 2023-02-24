/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';

import { Text } from '../Text';
import { KeyName } from './typings';

type LabelProps<T extends Record<string, unknown>> = {
  labelFor?: KeyName<T>;
  label?: string;
  className?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md';
  labelProps?: Record<string, unknown>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StyledLabel = styled.label<{ size: LabelProps<any>['size'] }>(
  ({ size }) => ({
    width: size === 'sm' ? 'unset' : '100%',
    ...(size === 'sm' && {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }),
  })
);

export function Label<T extends Record<string, unknown>>({
  labelFor,
  label,
  className,
  children,
  size = 'md',
  labelProps,
}: LabelProps<T>) {
  return label ? (
    <StyledLabel
      className={className}
      htmlFor={labelFor}
      size={size}
      {...labelProps}
    >
      <Text as="p" fontWeight="bold" variant="body-sm">
        {label}
      </Text>
      {children}
    </StyledLabel>
  ) : (
    <>{children}</>
  );
}
