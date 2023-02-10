import styled from '@emotion/styled';

import { MarginProps } from '../box/types';
import { createTextSharedStyles } from './styles';
import { TypographyProps } from './types';

type CaptionProps = Pick<MarginProps, 'mb'> & TypographyProps;

export const Caption = styled.p<CaptionProps>`
  ${({ theme, variant = 'normal', ...rest }) =>
    createTextSharedStyles(theme, { ...rest, variant })}
  font-size: ${({ theme }) => theme.fontSize.caption};
`;
