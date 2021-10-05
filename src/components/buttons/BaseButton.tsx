import styled from '@emotion/styled';

import { BaseButtonProps } from './types';

const StyledButton = styled.button`
  cursor: pointer;
  min-height: ${({ theme }) => theme.spacing[40]};
  min-width: ${({ theme }) => theme.spacing[40]};
`;

export const BaseButton: React.FC<BaseButtonProps> = ({
  onClick,
  className,
  type = 'button',
  disabled,
  children,
}) => (
  <StyledButton
    className={className}
    disabled={disabled || !onClick}
    // eslint-disable-next-line react/button-has-type
    type={type}
    onClick={onClick}
  >
    {children}
  </StyledButton>
);
