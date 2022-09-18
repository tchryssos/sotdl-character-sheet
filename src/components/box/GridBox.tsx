import styled from '@emotion/styled';

import { Spacing } from '~/typings/theme';

import { Box } from './Box';
import { AlignItemsBase, BoxProps } from './types';

export type GridBoxProps = BoxProps & {
  center?: boolean;
  justifyItems?: 'normal' | 'start' | 'end' | 'center';
  alignItems?: AlignItemsBase | 'end' | 'start';
  inline?: boolean;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  columnGap?: Spacing;
  rowGap?: Spacing;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
};

export const GridBox = styled(Box)<GridBoxProps>(
  { display: 'grid' },
  ({
    center,
    justifyItems,
    alignItems,
    inline,
    columns = 2,
    columnGap,
    rowGap,
    gridTemplateColumns,
    gridTemplateRows,
    theme,
  }) => ({
    justifyItems,
    alignItems,
    columnGap: `${(columnGap || 8) / 16}rem`,
    rowGap: `${(rowGap || 8) / 16}rem`,
    ...(center && {
      justifyItems: 'center',
      alignItems: 'center',
    }),
    ...(inline && {
      display: 'inline-grid',
    }),
    gridTemplateColumns: gridTemplateColumns || `repeat(${columns}, 1fr)`,
    gridTemplateRows,
    [theme.breakpoints.sm]: {
      rowGap: `${(rowGap || 16) / 16}rem`,
      columnGap: `${(columnGap || 16) / 16}rem`,
    },
  })
);
