import { SKULL } from '~/constants/ascii';
import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { Ascii } from './Ascii';

interface LogoAsciiProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function NotFoundAscii({ size = 'lg', className }: LogoAsciiProps) {
  let fontSize: string;
  switch (size) {
    case 'xs':
      fontSize = pxToRem(1);
      break;
    case 'sm':
      fontSize = pxToRem(2);
      break;
    case 'lg':
      fontSize = pxToRem(8);
      break;
    default:
      fontSize = pxToRem(6);
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
