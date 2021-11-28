import styled from '@emotion/styled';

import { Icon } from './Icon';
import { IconProps } from './types';

const Path = styled.path<Pick<IconProps, 'color'>>`
  fill: ${({ color = 'danger', theme }) => theme.colors[color]};
`;

export const Warning: React.FC<IconProps> = ({
  className,
  color,
  title,
  titleId,
}) => (
  <Icon className={className} title={title} titleId={titleId}>
    <Path color={color} d="M11 4h2v11h-2V4Zm2 14v2h-2v-2h2Z" />
  </Icon>
);
