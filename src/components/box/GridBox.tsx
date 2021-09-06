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
};

const Grid = styled(Box)<GridBoxProps>(
  { display: 'grid' },
  ({
    center,
    justifyItems,
    alignItems,
    inline,
    columns = 2,
    columnGap,
    rowGap,
    theme,
    gridTemplateColumns,
  }) => ({
    justifyItems,
    alignItems,
    columnGap: `${(columnGap || 0) / 16}rem`,
    rowGap: `${(rowGap || 0) / 16}rem`,
    gridTemplateColumns: '1fr',
    ...(center && {
      justifyItems: 'center',
      alignItems: 'center',
    }),
    ...(inline && {
      display: 'inline-grid',
    }),
    [theme.breakpoints.sm]: {
      gridTemplateColumns: gridTemplateColumns || `repeat(${columns}, 1fr)`,
    },
  })
);

export const GridBox: React.FC<GridBoxProps> = ({ children, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Grid {...rest}>{children}</Grid>
);
