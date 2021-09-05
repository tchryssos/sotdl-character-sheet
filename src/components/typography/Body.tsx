import styled from '@emotion/styled';

import { MarginProps } from '../box/types';
import { TypographyProps } from './types';

type BodyProps = Pick<MarginProps, 'mb'> & TypographyProps;

const BodyText = styled.p<Omit<BodyProps, 'children'>>`
  font-size: ${({ theme }) => theme.fontSize.body};
  font-weight: ${({ theme, bold }) =>
    bold ? theme.fontWeight.bold : theme.fontWeight.regular};
  font-family: ${({ theme }) => theme.fontFamily};
  line-height: ${({ theme }) => theme.lineHeight.normal};
  margin-bottom: ${({ theme, mb = 0 }) => `${theme.spacing[mb]}`};
`;

const Body: React.FC<BodyProps> = ({ children, className, bold, mb }) => (
  <BodyText bold={bold} className={className} mb={mb}>
    {children}
  </BodyText>
);

export default Body;
