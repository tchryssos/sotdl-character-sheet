import styled from '@emotion/styled';

import { MarginProps } from '../box/types';
import { createTextSharedStyles } from './styles';
import { TypographyProps } from './types';

type SubTitleProps = Pick<MarginProps, 'mb'> & TypographyProps;

export const SubTitle = styled.h2<SubTitleProps>(
  ({ theme, variant = 'decorative', ...rest }) => ({
    ...createTextSharedStyles(theme, { variant, ...rest }),
    fontSize: theme.fontSize.bigBody,
    [theme.breakpoints.sm]: {
      fontSize: theme.fontSize.subTitle,
    },
  })
);
