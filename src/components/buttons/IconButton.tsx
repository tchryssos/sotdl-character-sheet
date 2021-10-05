import styled from '@emotion/styled';

import { BaseButton } from './BaseButton';
import { BaseButtonProps } from './types';

const IconSafeButton = styled(BaseButton)``;

export const IconButton: React.FC<BaseButtonProps> = ({
  children,
  ...rest
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <IconSafeButton {...rest}>{children}</IconSafeButton>
);
