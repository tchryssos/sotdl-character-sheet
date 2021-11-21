import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { LoadingQuarter } from './icons/LoadingQuarter';

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
