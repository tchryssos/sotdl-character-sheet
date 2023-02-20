import styled from '@emotion/styled';

import { Color } from '~/typings/theme';

import { FlexBox } from './box/FlexBox';
import { Body } from './typography/Body';

type DividerProps = {
  label?: string;
  className?: string;
  color?: Color;
};

const DividerWrapper = styled(FlexBox)`
  min-height: ${({ theme }) => theme.borderWidth[1]};
  width: 100%;
`;

const Segment = styled.div<Pick<DividerProps, 'color'>>`
  width: 100%;
  height: ${({ theme }) => theme.borderWidth[1]};
  background-color: ${({ theme, color }) => theme.colors[color || 'text']};
`;

const Label = styled(Body)`
  padding: 0 ${({ theme }) => theme.spacing[16]};
`;

export const Divider: React.FC<DividerProps> = ({
  label,
  className,
  color,
}) => (
  <DividerWrapper center className={className}>
    {label && (
      <>
        <Segment color={color} />
        <Label>{label}</Label>
      </>
    )}
    <Segment color={color} />
  </DividerWrapper>
);
