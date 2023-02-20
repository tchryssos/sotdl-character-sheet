/* eslint-disable react/jsx-props-no-spreading */
import { PropsWithChildren } from 'react';

import { AllowedCommonCssProps, AllowedFlexboxCssProps } from '~/constants/css';

import { Box } from './Box';

type FlexBoxProps = Omit<AllowedCommonCssProps, 'display'> &
  AllowedFlexboxCssProps & {
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
