import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { FlexBox, FlexBoxProps } from './box/FlexBox';

interface PaneProps extends Omit<FlexBoxProps, 'ref'> {
  shadowed?: boolean;
}

const StyledPane = styled(FlexBox)<Pick<PaneProps, 'shadowed'>>(
  ({ theme, shadowed }) => ({
    borderColor: theme.colors.accentLight,
    borderWidth: theme.borderWidth[1],
    borderStyle: 'solid',
    boxShadow: shadowed
      ? `${pxToRem(4)} ${pxToRem(6)} ${theme.colors.accentHeavy}`
      : 'none',
    minWidth: pxToRem(256),
  })
);

export function Pane({
  paddingX = 24,
  paddingY = 16,
  justifyContent = 'center',
  alignItems = 'center',
  flexDirection = 'column',
  children,
  ...rest
}: PropsWithChildren<PaneProps>) {
  return (
    <StyledPane
      alignItems={alignItems}
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      paddingX={paddingX}
      paddingY={paddingY}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </StyledPane>
  );
}
