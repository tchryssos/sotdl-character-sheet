import styled from '@emotion/styled';
import { Tabs as MuiTabs, TabsList } from '@mui/base';
import { PropsWithChildren } from 'react';

import { TabLabel } from './TabLabel';
import type { TabLabelObject } from './types';

interface TabsProps {
  tabLabels: TabLabelObject[];
  defaultTab?: number;
}

const LabelsContainer = styled(TabsList)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing[8],
}));

export function Tabs({
  tabLabels,
  defaultTab = 0,
  children,
}: PropsWithChildren<TabsProps>) {
  return (
    <MuiTabs defaultValue={defaultTab}>
      <LabelsContainer>
        {tabLabels.map((label, index) => (
          <TabLabel index={index} key={label.label} label={label} />
        ))}
      </LabelsContainer>
      {children}
    </MuiTabs>
  );
}
