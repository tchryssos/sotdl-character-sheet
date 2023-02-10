import styled from '@emotion/styled';

import { BaseIconProps } from './types';

const Svg = styled.svg`
  height: 100%;
  width: 100%;
`;

export const Icon: React.FC<BaseIconProps> = ({
  viewBox = '0 0 24 24',
  title,
  titleId,
  className,
  children,
}) => {
  const id = titleId || `${title}-icon`;
  return (
    <Svg
      aria-labelledby={id}
      className={className}
      role="img"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={id}>{title}</title>
      {children}
    </Svg>
  );
};
