import styled from '@emotion/styled';

import { SCIMITAR } from '~/constants/ascii';
import { pxToRem } from '~/utils/styles';

interface LogoAsciiProps {
  size?: 'sm' | 'md';
}

const AsciiText = styled.pre<Required<LogoAsciiProps>>(({ theme, size }) => ({
  color: theme.colors.text,
  fontSize: size === 'md' ? pxToRem(6) : pxToRem(2),
  marginBottom: theme.spacing[8],
}));

export const LogoAscii: React.FC<LogoAsciiProps> = ({ size = 'md' }) => (
  <figure aria-label="ascii art scimitar" role="img">
    <AsciiText size={size}>{SCIMITAR}</AsciiText>
  </figure>
);
