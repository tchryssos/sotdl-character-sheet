import styled from '@emotion/styled';

import { BaseButton } from './BaseButton';
import { BaseButtonProps } from './types';

interface IconButtonProps extends BaseButtonProps {
  size?: 'sm' | 'md' | 'lg';
}

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
    };
  }
);

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  size = 'sm',
  ...rest
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <IconSafeButton {...rest} size={size}>
    {children}
  </IconSafeButton>
);
