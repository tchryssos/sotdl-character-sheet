import styled from '@emotion/styled';

import { Body } from '~/components/typography/Body';

interface LabelProps {
  labelFor?: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
}

const StyledLabel = styled.label`
  width: 100%;
`;

export const Label: React.FC<LabelProps> = ({
  labelFor,
  label,
  className,
  children,
}) =>
  label && labelFor ? (
    <StyledLabel className={className} htmlFor={labelFor}>
      <Body>{label}</Body>
      {children}
    </StyledLabel>
  ) : (
    <>{children}</>
  );
