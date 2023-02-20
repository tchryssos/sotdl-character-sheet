import { AsciiSize } from '~/components/ascii/types';

export const getAsciiFontSize = (size: AsciiSize) => {
  /**
   * This doesn't use rems for two reasons:
   * 1) Practically speaking, we don't want this font size to change if people mess with
   * browser font sizes since it's not actually text.
   * 2) More bizarrely, Safari seems to set a "min size" for text using non-px units at
   * ~9px. This makes the logo HUGE. See https://stackoverflow.com/questions/52001765/media-queries-issue-safari-not-scaling-elements-in-rem
   *
   * TODO: Maybe ASCII should just use an image?
   */
  switch (size) {
    case 'xs':
      return 1;
    case 'sm':
      return 2;
    case 'lg':
      return 8;
    default:
      return 6;
  }
};
