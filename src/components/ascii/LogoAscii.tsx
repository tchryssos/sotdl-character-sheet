import { SCIMITAR } from '~/constants/ascii';
import { getAsciiFontSize } from '~/logic/utils/ascii';

import { Ascii } from './Ascii';
import { AsciiSize } from './types';

interface LogoAsciiProps {
  size?: AsciiSize;
  className?: string;
}

export function LogoAscii({ size = 'md', className }: LogoAsciiProps) {
  return (
    <Ascii
      className={className}
      fontSize={getAsciiFontSize(size)}
      label="SCIMITAR"
      text={SCIMITAR}
    />
  );
}
