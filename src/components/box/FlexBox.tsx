/* eslint-disable react/jsx-props-no-spreading */
import { HTMLAttributes, PropsWithChildren } from 'react';

import {
  AllowedCommonCssProps,
  AllowedCustomCssSpacingProps,
  AllowedFlexboxCssProps,
} from '~/constants/css';

import { Box } from './Box';

export type FlexBoxProps = Omit<AllowedCommonCssProps, 'display'> &
  AllowedFlexboxCssProps &
  AllowedCustomCssSpacingProps &
  HTMLAttributes<HTMLDivElement> & {
    className?: string;
    center?: boolean;
  };

export function FlexBox({
  children,
  flexWrap,
  center,
  justifyContent,
  alignItems,
  ...rest
}: PropsWithChildren<FlexBoxProps>) {
  return (
    <Box
      alignItems={alignItems || (center ? 'center' : 'flex-start')}
      display="flex"
      flexWrap={flexWrap || 'wrap'}
      justifyContent={justifyContent || (center ? 'center' : 'flex-start')}
      {...rest}
    >
      {children}
    </Box>
  );
}
