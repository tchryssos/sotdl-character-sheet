import styled from '@emotion/styled';

import { Icon } from './Icon';
import { IconProps } from './types';

const Path = styled.path<Pick<IconProps, 'color'>>`
  fill: ${({ color = 'text', theme }) => theme.colors[color]};
`;

export const LoadingQuarter: React.FC<IconProps> = ({
  className,
  color,
  title,
  titleId,
}) => (
  <Icon className={className} title={title} titleId={titleId}>
    <Path color={color} d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8Z" />
  </Icon>
);
