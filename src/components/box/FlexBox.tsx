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
  center,
  ...rest
}: PropsWithChildren<FlexBoxProps>) {
  return (
    <Box
      display="flex"
      {...(center && {
        alignItems: 'center',
        justifyContent: 'center',
      })}
      {...rest}
    >
      {children}
    </Box>
  );
}
