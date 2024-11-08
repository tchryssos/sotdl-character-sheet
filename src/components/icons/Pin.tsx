import styled from '@emotion/styled';

import { Icon } from './Icon';
import { IconProps } from './types';

const Path = styled.path<Pick<IconProps, 'color'>>`
  fill: ${({ color = 'text', theme }) => theme.colors[color]};
`;

export function Pin({ className, color, title, titleId }: IconProps) {
  return (
    <Icon className={className} title={title} titleId={titleId}>
      <Path
        color={color}
        d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2Z"
      />
    </Icon>
  );
}
