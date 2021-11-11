import styled from '@emotion/styled';

import { FlexBox } from '../box/FlexBox';
import { Head } from './Head';

type LayoutProps = {
  children?: React.ReactNode;
  title: string;
  meta: string;
};

const PageWrapper = styled(FlexBox)`
  max-width: ${({ theme }) => theme.breakpointValues.lg}px;
  width: 100%;
  height: 100%;
`;

export const Layout: React.FC<LayoutProps> = ({ children, title, meta }) => (
  <>
    <Head meta={meta} title={title} />
    <FlexBox flex={1} justifyContent="center" pb={8} px={16}>
      <PageWrapper alignItems="center" column>
        {children}
      </PageWrapper>
    </FlexBox>
  </>
);
