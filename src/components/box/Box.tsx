import styled from '@emotion/styled';

import { BoxProps } from './types';

export const Box = styled.div<BoxProps>(
  ({
    p = 0,
    m = 0,
    px = 0,
    py = 0,
    pt = 0,
    pl = 0,
    pb = 0,
    pr = 0,
    mx = 0,
    my = 0,
    mt = 0,
    mb = 0,
    ml = 0,
    mr = 0,
    borderColor,
    borderRadius,
    borderStyle,
    borderWidth,
    backgroundColor,
    display = 'block',
    theme,
  }) => ({
    paddingTop: theme.spacing[pt || py || p],
    paddingRight: theme.spacing[pr || px || p],
    paddingBottom: theme.spacing[pb || py || p],
    paddingLeft: theme.spacing[pl || px || p],
    marginTop: theme.spacing[mt || my || m],
    marginRight: theme.spacing[mr || mx || m],
    marginBottom: theme.spacing[mb || my || m],
    marginLeft: theme.spacing[ml || mx || m],
    borderColor: borderColor && theme.colors[borderColor],
    borderWidth: borderWidth && theme.border.borderWidth[borderWidth],
    backgroundColor: backgroundColor
      ? theme.colors[backgroundColor]
      : 'transparent',
    borderRadius,
    borderStyle,
    display,
  })
);
