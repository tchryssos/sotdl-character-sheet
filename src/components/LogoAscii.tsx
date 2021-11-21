import styled from '@emotion/styled';

import { SCIMITAR } from '~/constants/ascii';
import { pxToRem } from '~/logic/utils/styles/pxToRem';

interface LogoAsciiProps {
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

const AsciiText = styled.pre<Required<Pick<LogoAsciiProps, 'size'>>>(
  ({ theme, size }) => {
    let fontSize: string;
    switch (size) {
      case 'xs':
        fontSize = pxToRem(1);
        break;
      case 'sm':
        fontSize = pxToRem(2);
        break;
      default:
        fontSize = pxToRem(6);
        break;
    }
    return {
      color: theme.colors.text,
      fontSize,
      userSelect: 'none',
    };
  }
);

export const LogoAscii: React.FC<LogoAsciiProps> = ({
  size = 'md',
  className,
}) => (
  <figure aria-label="ascii art scimitar" className={className} role="img">
    <AsciiText size={size}>{SCIMITAR}</AsciiText>
  </figure>
);
