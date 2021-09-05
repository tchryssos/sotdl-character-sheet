import styled from '@emotion/styled';

import { MarginProps } from '../box/types';
import { TypographyProps } from './types';

type TitleProps = Pick<MarginProps, 'mb'> & TypographyProps;

const Text = styled.h1<TitleProps>`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSize.title};
  margin-bottom: ${({ theme, mb = 24 }) => theme.spacing[mb]};
  line-height: ${({ theme }) => theme.lineHeight.normal};
  font-weight: ${({ theme, bold }) =>
    bold ? theme.fontWeight.bold : theme.fontWeight.regular};
`;

const Title: React.FC<TitleProps> = ({ bold, className, children, mb }) => (
  <Text bold={bold} className={className} mb={mb}>
    {children}
  </Text>
);

export default Title;
