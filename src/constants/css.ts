// eslint-disable-next-line import/no-extraneous-dependencies
import * as CSS from 'csstype';

import { BreakpointSize, Spacing } from '../typings/theme';
import { Theme } from './theme';

type OptionalStyleByBreakpointKeys = Exclude<BreakpointSize, 'xxs'>;
export type RequiredStyleByBreakpointKeys = 'base';
export type StyleByBreakpointKeys =
  | OptionalStyleByBreakpointKeys
  | RequiredStyleByBreakpointKeys;

export type StyleByBreakpointObject<T> = {
  [K in OptionalStyleByBreakpointKeys]?: T;
} & {
  [K in RequiredStyleByBreakpointKeys]: T;
};

type StyleOrByBreakpoint<T> = T | StyleByBreakpointObject<T>;

export const ALLOWED_COMMON_CSS_KEYS = [
  'alignSelf',
  'aspectRatio',
  'background',
  'backdropFilter',
  'backgroundColor',
  'backgroundImage',
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
  'borderRadius',
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
  'gridColumn',
  'gridRow',
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
  'minHeight',
  'minWidth',
  'opacity',
  'overflow',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'position',
  'right',
  'textOverflow',
  'textAlign',
  'top',
  'transform',
  'width',
  'textDecoration',
  'zIndex',
] as const;

const CUSTOM_CSS_SPACING_KEYS = [
  'marginX',
  'marginY',
  'paddingX',
  'paddingY',
] as const;
type SpacingValues = Spacing | CSS.Properties['margin'];
export type AllowedCustomCssSpacingProps = {
  [k in (typeof CUSTOM_CSS_SPACING_KEYS)[number]]?: SpacingValues;
};

type RawAllowedCommonCssProps = {
  [k in (typeof ALLOWED_COMMON_CSS_KEYS)[number]]?: CSS.Properties[k];
};

export const ALLOWED_TEXT_CSS_KEYS = [
  'lineHeight',
  'lineClamp',
  'textTransform',
] as const;

type RawAllowedTextCssProps = {
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

type RawAllowedFlexboxCssProps = {
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

type RawAllowedGridBoxCssProps = {
  [k in (typeof ALLOWED_GRIDBOX_CSS_KEYS)[number]]?: CSS.Properties[k];
};

type RawAllowedCustomCssProps = AllowedCustomCssSpacingProps;

type RawAllowedCssProps = RawAllowedCommonCssProps &
  RawAllowedTextCssProps &
  RawAllowedFlexboxCssProps &
  RawAllowedGridBoxCssProps &
  RawAllowedCustomCssProps;

export const ALL_ALLOWED_CSS_PROPS = [
  ...ALLOWED_COMMON_CSS_KEYS,
  ...ALLOWED_FLEXBOX_CSS_KEYS,
  ...ALLOWED_GRIDBOX_CSS_KEYS,
  ...ALLOWED_TEXT_CSS_KEYS,
];

export const CUSTOM_THEME_CSS_PROPS = {
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
  borderTopWidth: 'borderWidth',
  borderLeftWidth: 'borderWidth',
  borderRightWidth: 'borderWidth',
  borderBottomWidth: 'borderWidth',
  borderRadius: 'borderRadius',
  fontSize: 'fontSize',
  height: 'spacing',
  width: 'spacing',
  maxWidth: 'spacing',
  maxHeight: 'spacing',
  minWidth: 'spacing',
  minHeight: 'spacing',
  // ts-prune-ignore-next
} satisfies {
  [k in keyof RawAllowedCssProps]: keyof Theme;
};

// Map the "raw" allowed css props to account for properties that
// have a custom theme mapping.
// This also applies the "style by breakpoint" pattern
// to the resolved type
type AllowedCssPropsWithTheme<T> = {
  [K in keyof T]: StyleOrByBreakpoint<
    K extends keyof typeof CUSTOM_THEME_CSS_PROPS
      ? keyof Theme[(typeof CUSTOM_THEME_CSS_PROPS)[K]] | T[K]
      : T[K]
  >;
};

export type AllowedCommonCssProps =
  AllowedCssPropsWithTheme<RawAllowedCommonCssProps>;
export type AllowedTextCssProps =
  AllowedCssPropsWithTheme<RawAllowedTextCssProps>;
export type AllowedFlexboxCssProps =
  AllowedCssPropsWithTheme<RawAllowedFlexboxCssProps>;
export type AllowedGridBoxCssProps =
  AllowedCssPropsWithTheme<RawAllowedGridBoxCssProps>;
export type AllowedCustomCssProps =
  AllowedCssPropsWithTheme<RawAllowedCustomCssProps>;

// We don't need this all allowed types yet but we might
// export type AllowedCssProps = AllowedCommonCssProps &
//   AllowedTextCssProps &
//   AllowedFlexboxCssProps &
//   AllowedGridBoxCssProps &
//   AllowedCustomCssProps;
