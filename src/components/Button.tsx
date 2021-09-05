import styled from '@emotion/styled';

import { Body } from './typography/Body';

const StyledButton = styled.button`
  cursor: pointer;
`;

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  label: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  label,
  type = 'button',
  disabled,
}) => (
  <StyledButton
    className={className}
    disabled={disabled || !onClick}
    // eslint-disable-next-line react/button-has-type
    type={type}
    onClick={onClick}
  >
    <Body>{label}</Body>
  </StyledButton>
);
