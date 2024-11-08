import { useTheme } from '@emotion/react';
import { ComponentProps, PropsWithChildren } from 'react';

import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';

import { FlexBox } from '../box/FlexBox';

export function BodyContainer({
  children,
  ...rest
}: PropsWithChildren<ComponentProps<typeof FlexBox>>) {
  const atLeastXs = useBreakpointsAtLeast('xs');
  const theme = useTheme();

  return (
    <FlexBox
      flex={1}
      justifyContent="center"
      paddingX={atLeastXs ? 32 : 16}
      {...rest}
    >
      <FlexBox
        alignItems="center"
        flexDirection="column"
        height="100%"
        maxWidth={`${theme.breakpointValues.lg}px`}
        width="100%"
      >
        {children}
      </FlexBox>
    </FlexBox>
  );
}
