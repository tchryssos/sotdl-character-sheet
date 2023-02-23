import styled from '@emotion/styled';

import { Color } from '~/typings/theme';

import { FlexBox } from './box/FlexBox';
import { Text } from './Text';

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

const Label = styled(Text)`
  padding: 0 ${({ theme }) => theme.spacing[16]};
`;

export function Divider({ label, className, color }: DividerProps) {
  return (
    <DividerWrapper center className={className}>
      {label && (
        <>
          <Segment color={color} />
          <Label as="p" variant="body">
            {label}
          </Label>
        </>
      )}
      <Segment color={color} />
    </DividerWrapper>
  );
}
