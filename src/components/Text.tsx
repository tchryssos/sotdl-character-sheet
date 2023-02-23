import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

import { AllowedCommonCssProps, AllowedTextCssProps } from '~/constants/css';
import { filterCssProps } from '~/logic/utils/styles/css';

type TextProps = AllowedCommonCssProps &
  AllowedTextCssProps & {
    className?: string;
    as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    variant?:
      | 'body-sm'
      | 'body'
      | 'body-lg'
      | 'title-sm'
      | 'title'
      | 'title-lg'
      | 'title-xl';
  };

type VariantOrAs = NonNullable<TextProps['variant'] | TextProps['as']>;

const getFontSize = (theme: Theme, variantOrAs: VariantOrAs) => {
  const fontSizeLookup: Record<VariantOrAs, string> = {
    // Variants
    'body-sm': theme.fontSize[14],
    body: theme.fontSize[16],
    'body-lg': theme.fontSize[18],
    'title-sm': theme.fontSize[20],
    title: theme.fontSize[24],
    'title-lg': theme.fontSize[32],
    'title-xl': theme.fontSize[56],

    // As
    h1: theme.fontSize[56],
    h2: theme.fontSize[32],
    h3: theme.fontSize[24],
    h4: theme.fontSize[20],
    h5: theme.fontSize[20],
    h6: theme.fontSize[20],
    p: theme.fontSize[16],
    span: theme.fontSize[16],
  };

  const fontSize = fontSizeLookup[variantOrAs];

  return fontSize || theme.fontSize[16];
};

export const Text = styled('span')<TextProps>(
  ({ as, variant, theme, ...rest }) => {
    const fontSize = getFontSize(theme, variant || as || 'body');

    return {
      fontWeight: theme.fontWeight.regular,
      fontFamily: theme.fontFamily.normal,
      fontSize,
      ...filterCssProps(rest, theme),
    };
  }
);
