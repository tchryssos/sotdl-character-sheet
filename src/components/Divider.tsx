import styled from '@emotion/styled';

import { FlexBox } from './box/FlexBox';
import { Body } from './typography/Body';

type DividerProps = {
  label?: string;
  className?: string;
};

const Segment = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.border.borderWidth[1]};
  background-color: ${({ theme }) => theme.colors.text};
`;

const Label = styled(Body)`
  padding: 0 ${({ theme }) => theme.spacing[16]};
`;

export const Divider: React.FC<DividerProps> = ({ label, className }) => (
  <FlexBox center className={className}>
    {label && (
      <>
        <Segment />
        <Label>{label}</Label>
      </>
    )}
    <Segment />
  </FlexBox>
);
