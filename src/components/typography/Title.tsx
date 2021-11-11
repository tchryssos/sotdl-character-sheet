import styled from '@emotion/styled';

import { MarginProps } from '../box/types';
import { createTextSharedStyles } from './styles';
import { TypographyProps } from './types';

type TitleProps = Pick<MarginProps, 'mb'> & TypographyProps;

export const Title = styled.h1<TitleProps>`
  ${({ theme, variant = 'decorative', ...rest }) =>
    createTextSharedStyles(theme, { ...rest, variant })}
  font-size: ${({ theme }) => theme.fontSize.title};
`;
