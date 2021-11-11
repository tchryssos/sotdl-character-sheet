import styled from '@emotion/styled';

import { BaseButtonProps } from './types';

const StyledButton = styled.button(({ theme }) => ({
  cursor: 'pointer',
  minHeight: theme.spacing[32],
  minWidth: theme.spacing[32],
  backgroundColor: theme.colors.accentHeavy,
  ':disabled': {
    cursor: 'not-allowed',
    backgroundColor: theme.colors.accentLight,
  },
}));

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
