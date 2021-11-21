import styled from '@emotion/styled';

import { Color } from '~/typings/theme';

import { StatusIcon, StatusIconProps } from '../icons/StatusIcon';
import { BaseButton } from './BaseButton';
import { BaseButtonProps } from './types';

interface StandardButtonProps extends BaseButtonProps {
  size?: 'sm' | 'md' | 'lg';
}

interface StatusButtonProps extends StandardButtonProps, StatusIconProps {
  statusColor?: Color;
}

export type IconButtonProps = StandardButtonProps | StatusButtonProps;

const IconSafeButton = styled(BaseButton)<Pick<IconButtonProps, 'size'>>(
  ({ theme, size }) => {
    let dimension: string;
    switch (size) {
      case 'md':
        dimension = theme.spacing['40'];
        break;
      case 'lg':
        dimension = theme.spacing['48'];
        break;
      default:
        dimension = theme.spacing['32'];
    }
    return {
      height: dimension,
      width: dimension,
      minWidth: dimension,
      minHeight: dimension,
      backgroundColor: 'transparent',
      border: 'none',
      ':hover': {
        backgroundColor: theme.colors.accentLight,
        filter: 'brightness(1.0)',
      },
      ':disabled': {
        backgroundColor: 'transparent',
      },
    };
  }
);

const IconsWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Status = styled(StatusIcon)(({ theme }) => ({
  backgroundColor: theme.colors.background,
  position: 'absolute',
  borderRadius: '50%',
  bottom: 0,
  right: 0,
  height: theme.spacing[12],
  width: theme.spacing[12],
  boxSizing: 'border-box',
}));

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const { children, size = 'sm', ...rest } = props as StandardButtonProps;
  const {
    isLoading,
    isSuccessful,
    hasError,
    forceNeutral,
    statusColor,
    statusOf,
  } = props as StatusButtonProps;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <IconSafeButton {...rest} size={size}>
      <IconsWrapper>
        {children}
        <Status
          color={statusColor}
          forceNeutral={forceNeutral}
          hasError={hasError}
          isLoading={isLoading}
          isSuccessful={isSuccessful}
          statusOf={statusOf}
        />
      </IconsWrapper>
    </IconSafeButton>
  );
};
