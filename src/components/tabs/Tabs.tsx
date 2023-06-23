import styled from '@emotion/styled';
import { Tabs as MuiTabs, TabsList } from '@mui/base';
import { ComponentProps, PropsWithChildren, useState } from 'react';

import { TabLabel } from './TabLabel';
import type { TabLabelObject } from './types';

interface TabsProps {
  tabLabels: TabLabelObject[];
  defaultTab?: number;
  onChange?: (index: number) => void;
}

const LabelsContainer = styled(TabsList)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing[8],
  flexWrap: 'wrap',
}));

export function Tabs({
  tabLabels,
  defaultTab = 0,
  children,
  onChange,
}: PropsWithChildren<TabsProps>) {
  const [tabIndex, setTabIndex] = useState(defaultTab);
  const onTabChange: ComponentProps<typeof MuiTabs>['onChange'] = (_, i) => {
    setTabIndex(i as number);
    onChange?.(i as number);
  };

  return (
    <MuiTabs defaultValue={defaultTab} value={tabIndex} onChange={onTabChange}>
      <LabelsContainer>
        {tabLabels.map((label, index) => (
          <TabLabel index={index} key={label.label} label={label} />
        ))}
      </LabelsContainer>
      {children}
    </MuiTabs>
  );
}
