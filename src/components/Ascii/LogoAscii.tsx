import { SCIMITAR } from '~/constants/ascii';
import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { Ascii } from './Ascii';

interface LogoAsciiProps {
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export const LogoAscii: React.FC<LogoAsciiProps> = ({
  size = 'md',
  className,
}) => {
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

  return (
    <Ascii
      className={className}
      fontSize={fontSize}
      label="SCIMITAR"
      text={SCIMITAR}
    />
  );
};
