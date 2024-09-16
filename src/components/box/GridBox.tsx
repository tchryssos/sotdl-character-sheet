import { HTMLAttributes, PropsWithChildren } from 'react';

import {
  AllowedCommonCssProps,
  AllowedCustomCssProps,
  AllowedGridBoxCssProps,
} from '~/constants/css';

import { Box } from './Box';

export type GridBoxProps = Omit<AllowedCommonCssProps, 'display'> &
  AllowedGridBoxCssProps &
  AllowedCustomCssProps &
  HTMLAttributes<HTMLDivElement> & {
    className?: string;
  };

export function GridBox({
  children,
  columns = 2,
  columnGap,
  rowGap,
  gridTemplateColumns,
  gap,
  ...rest
}: PropsWithChildren<GridBoxProps>) {
  return (
    <Box
      columnGap={columnGap ?? gap ?? { base: 8, sm: 16 }}
      columns={gridTemplateColumns ? undefined : columns}
      display="grid"
      gridTemplateColumns={gridTemplateColumns}
      rowGap={rowGap ?? gap ?? { base: 8, sm: 16 }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </Box>
  );
}
