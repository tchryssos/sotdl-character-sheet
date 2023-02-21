/* eslint-disable react/jsx-props-no-spreading */
// import styled from '@emotion/styled';

// import { Spacing } from '~/typings/theme';

// import { Box } from './Box';
// import { AlignItemsBase, BoxProps } from './types';

// export type GridBoxProps = BoxProps & {
//   center?: boolean;
//   justifyItems?: 'normal' | 'start' | 'end' | 'center';
//   alignItems?: AlignItemsBase | 'end' | 'start';
//   inline?: boolean;
//   columns?: 1 | 2 | 3 | 4;
//   className?: string;
//   columnGap?: Spacing;
//   rowGap?: Spacing;
//   gridTemplateColumns?: string;
// };

// export const GridBox = styled(Box)<GridBoxProps>(
//   { display: 'grid' },
//   ({
//     center,
//     justifyItems,
//     alignItems,
//     inline,
//     columns = 2,
//     columnGap,
//     rowGap,
//     gridTemplateColumns,
//     theme,
//   }) => ({
//     justifyItems,
//     alignItems,
//     columnGap: `${(columnGap || 8) / 16}rem`,
//     rowGap: `${(rowGap || 8) / 16}rem`,
//     ...(center && {
//       justifyItems: 'center',
//       alignItems: 'center',
//     }),
//     ...(inline && {
//       display: 'inline-grid',
//     }),
//     gridTemplateColumns: gridTemplateColumns || `repeat(${columns}, 1fr)`,
//     [theme.breakpoints.sm]: {
//       rowGap: `${(rowGap || 16) / 16}rem`,
//       columnGap: `${(columnGap || 16) / 16}rem`,
//     },
//   })
// );

import { HTMLAttributes, PropsWithChildren } from 'react';

import {
  AllowedCommonCssProps,
  AllowedCustomCssSpacingProps,
  AllowedGridBoxCssProps,
} from '~/constants/css';
import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { Box } from './Box';

export type GridBoxProps = Omit<AllowedCommonCssProps, 'display'> &
  AllowedGridBoxCssProps &
  AllowedCustomCssSpacingProps &
  HTMLAttributes<HTMLDivElement> & {
    columns?: number;
    className?: string;
  };

export function GridBox({
  children,
  columns = 2,
  gridTemplateColumns,
  columnGap,
  rowGap,
  ...rest
}: PropsWithChildren<GridBoxProps>) {
  return (
    <Box
      columnGap={columnGap || pxToRem(8)}
      display="grid"
      gridTemplateColumns={gridTemplateColumns || `repeat(${columns}, 1fr)`}
      rowGap={rowGap || pxToRem(8)}
      {...rest}
    >
      {children}
    </Box>
  );
}
