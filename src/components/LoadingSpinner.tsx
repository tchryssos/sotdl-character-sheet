import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { FlexBox } from './box/FlexBox';
import { LoadingQuarter } from './icons/LoadingQuarter';

const LoadingOuter = styled(FlexBox)`
  width: 100%;
`;

const LoadingInner = styled(FlexBox)(({ theme }) => ({
  width: '25%',
  [theme.breakpoints.xs]: {
    width: '15%',
  },
  [theme.breakpoints.md]: {
    width: '12%',
  },
  [theme.breakpoints.lg]: {
    width: '10%',
  },
}));

const LoadingSpin = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`;

export const LoadingSpinner = styled(LoadingQuarter)`
  animation: ${LoadingSpin} 1s linear infinite;
`;

interface LoadingPageProps {
  title: string;
  titleId: string;
}

export const LoadingPageSpinner: React.FC<LoadingPageProps> = ({
  title,
  titleId,
}) => (
  <LoadingOuter center>
    <LoadingInner>
      <LoadingSpinner title={title} titleId={titleId} />
    </LoadingInner>
  </LoadingOuter>
);
