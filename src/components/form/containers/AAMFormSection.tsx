import styled from '@emotion/styled';

import { FormSection } from '~/components/form/containers/FormSection';

export const AAMFormSection = styled(FormSection)`
  grid-column: span 1;
  ${({ theme }) => theme.breakpoints.sm} {
    grid-column: span 2;
  }
  ${({ theme }) => theme.breakpoints.md} {
    grid-column: span 3;
  }
`;
