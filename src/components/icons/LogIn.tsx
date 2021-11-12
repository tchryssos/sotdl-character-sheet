import styled from '@emotion/styled';

import { Icon } from './Icon';
import { IconProps } from './types';

const Path = styled.path<Pick<IconProps, 'color'>>`
  fill: ${({ color = 'text', theme }) => theme.colors[color]};
`;

export const LogIn: React.FC<IconProps> = ({
  className,
  color,
  title,
  titleId,
}) => (
  <Icon className={className} title={title} titleId={titleId}>
    <Path
      color={color}
      d="M19 3H5c-1.11 0-2 .89-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-8.92 12.58L11.5 17l5-5-5-5-1.42 1.41L12.67 11H3v2h9.67l-2.59 2.58Z"
    />
  </Icon>
);
