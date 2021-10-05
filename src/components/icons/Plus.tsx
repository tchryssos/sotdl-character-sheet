import styled from '@emotion/styled';

import { Icon } from './Icon';
import { IconProps } from './types';

const Path = styled.path<Pick<IconProps, 'color'>>`
  fill: ${({ color = 'black', theme }) => theme.colors[color]};
`;

export const Plus: React.FC<IconProps> = ({
  className,
  color,
  title,
  titleId,
}) => (
  <Icon
    className={className}
    title={title}
    titleId={titleId}
    viewBox="0 0 33 29"
  >
    <Path color={color} d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" />
  </Icon>
);
