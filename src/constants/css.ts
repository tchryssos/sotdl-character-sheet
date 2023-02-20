// eslint-disable-next-line import/no-extraneous-dependencies
import * as CSS from 'csstype';

import { Theme } from '~/constants/theme';
import { Spacing } from '~/typings/theme';

export const ALLOWED_COMMON_CSS_KEYS = [
  'alignSelf',
  'background',
  'backgroundColor',
  'border',
  'borderBottom',
  'borderBottomColor',
  'borderBottomStyle',
  'borderBottomWidth',
  'borderColor',
  'borderLeft',
  'borderLeftColor',
  'borderLeftStyle',
  'borderLeftWidth',
  'borderRight',
  'borderRightColor',
  'borderRightStyle',
  'borderRightWidth',
  'borderStyle',
  'borderTop',
  'borderTopColor',
  'borderTopStyle',
  'borderTopWidth',
  'borderWidth',
  'bottom',
  'boxShadow',
  'color',
  'display',
  'fontFamily',
  'fontStyle',
  'fontSize',
  'fontWeight',
  'gridColumnEnd',
  'gridColumnStart',
  'gridRowEnd',
  'gridRowStart',
  'height',
  'justifySelf',
  'left',
  'lineHeight',
  'margin',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'maxHeight',
  'maxWidth',
  'overflow',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'position',
  'right',
  'textOverflow',
  'top',
  'width',
] as const;

const CUSTOM_CSS_SPACING_KEYS = [
  'marginX',
  'marginY',
  'paddingX',
  'paddingY',
] as const;
export type AllowedCustomCssSpacingProps = {
  [k in (typeof CUSTOM_CSS_SPACING_KEYS)[number]]?:
    | Spacing
    | CSS.Properties['margin'];
};

export type AllowedCommonCssProps = {
  [k in (typeof ALLOWED_COMMON_CSS_KEYS)[number]]?: CSS.Properties[k];
};

export const ALLOWED_TEXT_CSS_KEYS = ['lineHeight', 'lineClamp'] as const;

export type AllowedTextCssProps = {
  [k in (typeof ALLOWED_TEXT_CSS_KEYS)[number]]?: CSS.Properties[k];
};

export const ALLOWED_FLEXBOX_CSS_KEYS = [
  'gap',
  'justifyContent',
  'alignItems',
  'flex',
  'flexDirection',
  'flexWrap',
] as const;

export type AllowedFlexboxCssProps = {
  [k in (typeof ALLOWED_FLEXBOX_CSS_KEYS)[number]]?: CSS.Properties[k];
};

export const ALLOWED_GRIDBOX_CSS_KEYS = [
  'gap',
  'rowGap',
  'columnGap',
  'gridTemplateColumns',
  'gridTemplateRows',
  'justifyItems',
  'alignItems',
  'placeItems',
  'justifyContent',
  'alignContent',
  'grid',
] as const;

export type AllowedGridBoxCssProps = {
  [k in (typeof ALLOWED_GRIDBOX_CSS_KEYS)[number]]?: CSS.Properties[k];
};

type AllowedCustomCssProps = AllowedCustomCssSpacingProps;

export type AllowedCssProps = AllowedCommonCssProps &
  AllowedTextCssProps &
  AllowedFlexboxCssProps &
  AllowedGridBoxCssProps &
  AllowedCustomCssProps;

export const ALL_ALLOWED_CSS_PROPS = [
  ...ALLOWED_COMMON_CSS_KEYS,
  ...ALLOWED_FLEXBOX_CSS_KEYS,
  ...ALLOWED_GRIDBOX_CSS_KEYS,
  ...ALLOWED_TEXT_CSS_KEYS,
];

export const CUSTOM_THEME_CSS_PROPS: {
  [k in keyof AllowedCssProps]: keyof Theme;
} = {
  backgroundColor: 'colors',
  color: 'colors',
  borderColor: 'colors',
  margin: 'spacing',
  marginBottom: 'spacing',
  marginLeft: 'spacing',
  marginRight: 'spacing',
  marginTop: 'spacing',
  marginX: 'spacing',
  marginY: 'spacing',
  padding: 'spacing',
  paddingBottom: 'spacing',
  paddingLeft: 'spacing',
  paddingRight: 'spacing',
  paddingTop: 'spacing',
  paddingX: 'spacing',
  paddingY: 'spacing',
  gap: 'spacing',
  rowGap: 'spacing',
  columnGap: 'spacing',
  fontWeight: 'fontWeight',
  fontFamily: 'fontFamily',
  borderWidth: 'borderWidth',
  borderBottomWidth: 'borderRadius',
  fontSize: 'fontSize',
};
