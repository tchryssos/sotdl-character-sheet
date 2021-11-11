import styled from '@emotion/styled';

import { MarginProps } from '../box/types';
import { createTextSharedStyles } from './styles';
import { TypographyProps } from './types';

type TitleProps = Pick<MarginProps, 'mb'> & TypographyProps;

export const Title = styled.h1<TitleProps>(
  ({ theme, variant = 'decorative', shadowed = true, ...rest }) => ({
    ...createTextSharedStyles(theme, { variant, shadowed, ...rest }),
    fontSize: theme.fontSize.title,
  })
);
