import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

import { AllowedCommonCssProps, AllowedTextCssProps } from '~/constants/css';
import { filterCssProps } from '~/logic/utils/styles/css';

export type TextProps = AllowedCommonCssProps &
  AllowedTextCssProps & {
    className?: string;
    as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label';
    variant?:
      | 'body-xs'
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
  const bodySize = theme.fontSize[18];
  const bodyLgSize = theme.fontSize[20];
  const titleSmSize = theme.fontSize[24];
  const titleSize = theme.fontSize[32];
  // const titleLgSize = theme.fontSize[40];
  const titleXlSize = theme.fontSize[56];

  const fontSizeLookup: Record<VariantOrAs, string> = {
    // Variants
    'body-xs': theme.fontSize[14],
    'body-sm': theme.fontSize[16],
    body: bodySize,
    'body-lg': bodyLgSize,
    'title-sm': titleSmSize,
    title: titleSize,
    'title-lg': theme.fontSize[40],
    'title-xl': titleXlSize,

    // As
    h1: titleXlSize,
    h2: titleSize,
    h3: titleSmSize,
    h4: bodyLgSize,
    h5: bodyLgSize,
    h6: bodyLgSize,
    p: bodySize,
    span: bodySize,
    label: bodySize,
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
