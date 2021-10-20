import styled from '@emotion/styled';

import { Icon } from './Icon';
import { IconProps } from './types';

const Path = styled.path<Pick<IconProps, 'color'>>`
  fill: ${({ color = 'text', theme }) => theme.colors[color]};
`;

export const Sun: React.FC<IconProps> = ({
  className,
  color,
  title,
  titleId,
}) => (
  <Icon className={className} title={title} titleId={titleId}>
    <Path
      color={color}
      d="m3.55 18.54 1.41 1.41 1.8-1.79-1.42-1.42M11 22.45h2V19.5h-2m1-14a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6c0-3.32-2.69-6-6-6m8 7h3v-2h-3m-2.76 7.66 1.8 1.79 1.41-1.41-1.79-1.8m1.79-12.28-1.41-1.41-1.8 1.79 1.42 1.42M13 .55h-2V3.5h2m-9 7H1v2h3m2.76-7.66-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42Z"
    />
  </Icon>
);
