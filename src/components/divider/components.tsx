import styled from '@emotion/styled';

import { FlexBox } from '../box/FlexBox';
import { Text } from '../Text';
import { DividerProps } from './types';

export const DividerWrapper = styled(FlexBox)`
  min-height: ${({ theme }) => theme.borderWidth[1]};
  width: 100%;
`;

export const Segment = styled.div<Pick<DividerProps, 'color'>>`
  width: 100%;
  height: ${({ theme }) => theme.borderWidth[1]};
  background-color: ${({ theme, color }) => theme.colors[color || 'text']};
`;

export const Label = styled(Text)`
  padding: 0 ${({ theme }) => theme.spacing[16]};
`;
