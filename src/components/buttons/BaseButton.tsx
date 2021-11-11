import styled from '@emotion/styled';

import { BaseButtonProps } from './types';

type StyledProps = Pick<Required<BaseButtonProps>, 'transparent'>;

const StyledButton = styled.button<StyledProps>(({ theme, transparent }) => ({
  cursor: 'pointer',
  minHeight: theme.spacing[32],
  minWidth: theme.spacing[32],
  backgroundColor: transparent ? 'transparent' : theme.colors.accentHeavy,
  border: transparent
    ? `${theme.border.borderWidth[1]} solid ${theme.colors.text}`
    : 'none',
  borderRadius: theme.spacing[2],
  ':hover': {
    filter: `brightness(${theme.colors.brightnessMod})`,
  },
  ':disabled': {
    cursor: 'not-allowed',
    backgroundColor: transparent ? 'transparent' : theme.colors.accentLight,
    filter: 'brightness(1.0)',
  },
}));

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
    transparent={Boolean(transparent)}
    // eslint-disable-next-line react/button-has-type
    type={type}
    onClick={onClick}
  >
    {children}
  </StyledButton>
);
