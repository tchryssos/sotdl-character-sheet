import styled from '@emotion/styled';

import { pxToRem } from '~/logic/utils/styles/pxToRem';
import { Color } from '~/typings/theme';

import { FlexBox } from '../box/FlexBox';
import { BaseButtonProps } from './types';

type StyledProps = Pick<Required<BaseButtonProps>, 'transparent' | 'severity'>;

const StyledButton = styled.button<StyledProps>(
  ({ theme, transparent, severity }) => {
    let severityColor: Color = 'accentHeavy';
    switch (severity) {
      case 'danger':
        severityColor = 'danger';
        break;
      case 'warning':
        severityColor = 'warning';
        break;
      case 'success':
        severityColor = 'success';
        break;
      case 'normal':
      default:
        break;
    }
    return {
      color: theme.colors.text,
      cursor: 'pointer',
      minHeight: theme.spacing[32],
      minWidth: theme.spacing[32],
      backgroundColor: transparent
        ? 'transparent'
        : theme.colors[severityColor],
      border: transparent
        ? `${theme.border.borderWidth[1]} solid ${theme.colors.text}`
        : 'none',
      borderRadius: theme.spacing[2],
      // Non-standard padding matches default button padding
      padding: `${pxToRem(1)} ${pxToRem(6)}`,
      ':hover': {
        filter: `brightness(${theme.filters.brightnessMod})`,
      },
      ':disabled': {
        cursor: 'not-allowed',
        backgroundColor: theme.colors.accentLight,
        border: 'none',
        filter: 'brightness(1.0)',
      },
    };
  }
);

const ButtonLike = StyledButton.withComponent(FlexBox);

export function BaseButton({
  onClick,
  className,
  type = 'button',
  disabled,
  children,
  transparent,
  buttonLike,
  severity = 'normal',
}: BaseButtonProps) {
  if (buttonLike) {
    return (
      <ButtonLike
        center
        className={className}
        severity={severity}
        transparent={Boolean(transparent)}
      >
        {children}
      </ButtonLike>
    );
  }
  return (
    <StyledButton
      className={className}
      disabled={disabled || (!onClick && type !== 'submit')}
      severity={severity}
      transparent={Boolean(transparent)}
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}
