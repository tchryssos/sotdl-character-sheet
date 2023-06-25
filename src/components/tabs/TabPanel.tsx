import styled from '@emotion/styled';
import { TabPanel as MuiTabPanel } from '@mui/base';

export const TabPanel = styled(MuiTabPanel)`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing[16]};
`;
