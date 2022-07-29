import React, { MutableRefObject } from 'react';
import { Spacing, Color, BorderWidth } from '~/typings/theme';

export type MarginProps = {
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
};

export type BoxProps = MarginProps & {
  className?: string;
  children?: React.ReactNode | React.Node[];
  p?: Spacing;
  px?: Spacing;
  py?: Spacing;
  m?: Spacing;
  mx?: Spacing;
  my?: Spacing;
  pt?: Spacing;
  pr?: Spacing;
  pb?: Spacing;
  pl?: Spacing;
  display?:
    | 'inline'
    | 'block'
    | 'flex'
    | 'grid'
    | 'inline-block'
    | 'inline-flex'
    | 'inline-grid';
  backgroundColor?: Color;
  borderRadius?: 2 | 4 | 1000 | '25%' | '50%';
  borderColor?: Color;
  borderStyle?: 'solid' | 'none' | 'hidden';
  borderWidth?: BorderWidth;
  width?: string;
};

export type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'initial'
  | 'inherit';

export type AlignItemsBase =
  | 'stretch'
  | 'center'
  | 'baseline'
  | 'initial'
  | 'inherit';
