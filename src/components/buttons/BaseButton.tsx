import styled from '@emotion/styled';

import { pxToRem } from '~/utils/styles';

import { BaseButtonProps } from './types';

const StyledButton = styled.button<Pick<BaseButtonProps, 'transparent'>>(
  ({ theme, transparent }) => ({
    cursor: 'pointer',
    minHeight: theme.spacing[32],
    minWidth: theme.spacing[32],
    backgroundColor: transparent ? 'transparent' : theme.colors.accentHeavy,
    border: transparent
      ? `${theme.border.borderWidth[1]} solid ${theme.colors.text}`
      : 'none',
    borderRadius: pxToRem(2),
    ':disabled': {
      cursor: 'not-allowed',
      backgroundColor: transparent ? 'transparent' : theme.colors.accentLight,
    },
  })
);

export const BaseButton: React.FC<BaseButtonProps> = ({
  onClick,
  className,
  type = 'button',
  disabled,
  children,
  transparent,
}) => (
  <StyledButton
    className={className}
    disabled={disabled || !onClick}
    transparent={transparent}
    // eslint-disable-next-line react/button-has-type
    type={type}
    onClick={onClick}
  >
    {children}
  </StyledButton>
);
