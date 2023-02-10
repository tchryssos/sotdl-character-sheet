import styled from '@emotion/styled';

import { Icon } from './Icon';
import { IconProps } from './types';

const Path = styled.path<Pick<IconProps, 'color'>>`
  fill: ${({ color = 'text', theme }) => theme.colors[color]};
`;

export function MoveFile({ className, color, title, titleId }: IconProps) {
  return (
    <Icon className={className} title={title} titleId={titleId}>
      <Path
        color={color}
        d="M14 17h4v-3l5 4.5-5 4.5v-3h-4v-3m-1-8h5.5L13 3.5V9M6 2h8l6 6v4.34c-.63-.22-1.3-.34-2-.34a6 6 0 0 0-6 6c0 1.54.58 2.94 1.53 4H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
      />
    </Icon>
  );
}
