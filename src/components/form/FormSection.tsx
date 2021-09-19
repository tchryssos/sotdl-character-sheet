import styled from '@emotion/styled';

import { Box } from '../box/Box';
import { FlexBox } from '../box/FlexBox';
import { GridBox, GridBoxProps } from '../box/GridBox';
import { Body } from '../typography/Body';

const Text = styled(Body)`
  white-space: nowrap;
`;

const Section = styled(FlexBox)`
  height: 100%;
`;

const Line = styled(Box)`
  height: 0;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.grey};
`;

const Container = styled(GridBox)`
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-top: none;
  height: 100%;
`;

interface FormSectionProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  columns?: GridBoxProps['columns'];
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  columns,
}) => (
  <Section column>
    <FlexBox alignItems="flex-end" ml={4}>
      <Text italic>{title}</Text>
      <Line ml={8} />
    </FlexBox>
    <Container columns={columns} p={8}>
      {children}
    </Container>
  </Section>
);
