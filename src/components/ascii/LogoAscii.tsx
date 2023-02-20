import { SCIMITAR } from '~/constants/ascii';

import { Ascii } from './Ascii';

interface LogoAsciiProps {
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export function LogoAscii({ size = 'md', className }: LogoAsciiProps) {
  /**
   * This fontSize doesn't use rems for two reasons:
   * 1) Practically speaking, we don't want this font size to change if people mess with
   * browser font sizes since it's not actually text.
   * 2) More bizarrely, Safari seems to set a "min size" for text using non-px units at
   * ~9px. This makes the logo HUGE. See https://stackoverflow.com/questions/52001765/media-queries-issue-safari-not-scaling-elements-in-rem
   *
   * TODO: Maybe this should just be an image?
   */
  let fontSize: number;
  switch (size) {
    case 'xs':
      fontSize = 1;
      break;
    case 'sm':
      fontSize = 2;
      break;
    default:
      fontSize = 6;
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
}
