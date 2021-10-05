import styled from '@emotion/styled';

import { Icon } from './Icon';
import { IconProps } from './types';

const Path = styled.path<Pick<IconProps, 'color'>>`
  fill: ${({ color = 'black', theme }) => theme.colors[color]};
`;

export const ChevRight: React.FC<IconProps> = ({
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
    <Path
      color={color}
      d="M8.59 16.58 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42Z"
    />
  </Icon>
);
