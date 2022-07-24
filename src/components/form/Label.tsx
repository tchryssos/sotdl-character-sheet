import styled from '@emotion/styled';

import { SubBody } from '~/components/typography/SubBody';

type LabelProps<T extends Record<string, unknown>> = {
  labelFor?: Extract<keyof T, string>;
  label?: string;
  className?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md';
};

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
}: LabelProps<T>) {
  return label ? (
    <StyledLabel className={className} htmlFor={labelFor} size={size}>
      <SubBody bold>{label}</SubBody>
      {children}
    </StyledLabel>
  ) : (
    <>{children}</>
  );
}
