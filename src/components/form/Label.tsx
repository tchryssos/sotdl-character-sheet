import styled from '@emotion/styled';

import { SubBody } from '~/components/typography/SubBody';

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
  label ? (
    <StyledLabel className={className} htmlFor={labelFor}>
      <SubBody bold>{label}</SubBody>
      {children}
    </StyledLabel>
  ) : (
    <>{children}</>
  );
