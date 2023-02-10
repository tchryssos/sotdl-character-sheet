import styled from '@emotion/styled';
import { forwardRef } from 'react';

import { Spacing } from '~/typings/theme';

import { Box } from './Box';
import { AlignItemsBase, BoxProps, JustifyContent } from './types';

export type FlexBoxProps = BoxProps & {
  center?: boolean;
  column?: boolean;
  wrap?: boolean;
  inline?: boolean;
  justifyContent?: JustifyContent;
  alignItems?: AlignItemsBase | 'flex-end' | 'flex-start';
  flex?: number;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flexGrow?: number;
  flexShrink?: number;
  gap?: Spacing;
};

const Flex = styled(Box)<FlexBoxProps>(
  { display: 'flex' },
  ({
    center,
    column,
    wrap,
    inline,
    justifyContent,
    alignItems,
    flex,
    flexDirection,
    flexWrap,
    flexGrow,
    flexShrink,
    gap = 0,
    maxWidth,
    minWidth,
    theme,
  }) => ({
    justifyContent,
    alignItems,
    flex,
    flexDirection,
    flexWrap,
    flexGrow,
    flexShrink,
    maxWidth,
    minWidth,
    gap: theme.spacing[gap],
    ...(center && {
      justifyContent: 'center',
      alignItems: 'center',
    }),
    ...(column && {
      flexDirection: 'column',
    }),
    ...(wrap && {
      flexWrap: 'wrap',
    }),
    ...(inline && {
      display: 'inline-flex',
    }),
  })
);

export const FlexBox = forwardRef<HTMLDivElement, FlexBoxProps>(
  // eslint-disable-next-line prefer-arrow-callback
  function FlexBox({ children, ...rest }, ref) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Flex {...rest} ref={ref}>
        {children}
      </Flex>
    );
  }
);
