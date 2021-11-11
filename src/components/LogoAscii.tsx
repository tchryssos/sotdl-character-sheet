import styled from '@emotion/styled';

import { SCIMITAR } from '~/constants/ascii';
import { pxToRem } from '~/utils/styles';

interface LogoAsciiProps {
  size?: 'sm' | 'md';
  className?: string;
}

const AsciiText = styled.pre<Required<Pick<LogoAsciiProps, 'size'>>>(
  ({ theme, size }) => ({
    color: theme.colors.text,
    fontSize: size === 'md' ? pxToRem(6) : pxToRem(2),
  })
);

export const LogoAscii: React.FC<LogoAsciiProps> = ({
  size = 'md',
  className,
}) => (
  <figure aria-label="ascii art scimitar" className={className} role="img">
    <AsciiText size={size}>{SCIMITAR}</AsciiText>
  </figure>
);
