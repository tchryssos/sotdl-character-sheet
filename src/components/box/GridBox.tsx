import { useTheme } from '@emotion/react';
import { HTMLAttributes, PropsWithChildren } from 'react';

import {
  AllowedCommonCssProps,
  AllowedCustomCssSpacingProps,
  AllowedGridBoxCssProps,
} from '~/constants/css';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';

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
  const isAtLeastSm = useBreakpointsAtLeast('sm');
  const theme = useTheme();
  return (
    <Box
      columnGap={
        columnGap || isAtLeastSm ? theme.spacing[16] : theme.spacing[8]
      }
      display="grid"
      gridTemplateColumns={gridTemplateColumns || `repeat(${columns}, 1fr)`}
      rowGap={rowGap || isAtLeastSm ? theme.spacing[16] : theme.spacing[8]}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </Box>
  );
}
