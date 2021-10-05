import styled from '@emotion/styled';

import { Icon } from './Icon';
import { IconProps } from './types';

const Path = styled.path<Pick<IconProps, 'color'>>`
  fill: ${({ color = 'black', theme }) => theme.colors[color]};
`;

export const Delete: React.FC<IconProps> = ({
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
      d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"
    />
  </Icon>
);
