import styled from '@emotion/styled';

import { SubBody } from '~/components/typography/SubBody';

interface LabelProps {
  labelFor?: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledLabel = styled.label`
  width: 100%;
`;

export const Label: React.FC<LabelProps> = ({
  labelFor,
  label,
  className,
  children,
  onClick,
}) =>
  label ? (
    <StyledLabel className={className} htmlFor={labelFor} onClick={onClick}>
      <SubBody bold>{label}</SubBody>
      {children}
    </StyledLabel>
  ) : (
    <>{children}</>
  );
