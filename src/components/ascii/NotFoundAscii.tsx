import { SKULL } from '~/constants/ascii';

import { Ascii } from './Ascii';

interface LogoAsciiProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function NotFoundAscii({ size = 'lg', className }: LogoAsciiProps) {
  let fontSize: number;
  switch (size) {
    case 'xs':
      fontSize = 1;
      break;
    case 'sm':
      fontSize = 2;
      break;
    case 'lg':
      fontSize = 8;
      break;
    default:
      fontSize = 6;
      break;
  }

  return (
    <Ascii
      className={className}
      fontSize={fontSize}
      label="NOT FOUND"
      text={SKULL}
    />
  );
}
