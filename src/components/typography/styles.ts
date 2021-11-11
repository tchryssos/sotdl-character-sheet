import { css } from '@emotion/react';

import { Theme } from '~/constants/theme';

import { MarginProps } from '../box/types';
import { TypographyProps } from './types';

export const createTextSharedStyles = (
  theme: Theme,
  fontProps: Partial<TypographyProps> & Pick<MarginProps, 'mb'>
) =>
  css({
    fontFamily: theme.fontFamily[fontProps.variant || 'normal'],
    marginBottom: theme.spacing[fontProps.mb || 0],
    fontWeight: fontProps.bold
      ? theme.fontWeight.bold
      : theme.fontWeight.regular,
    fontStyle: fontProps.italic ? 'italic' : '',
    color: theme.colors.text,
    lineHeight: theme.lineHeight.normal,
  });
