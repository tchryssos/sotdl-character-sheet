import styled from '@emotion/styled';
import { Tabs as MuiTabs, TabsList } from '@mui/base';
import {
  ComponentProps,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { SetTabContext } from './SetTabContextProvider';
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
  onChange,
  children,
}: PropsWithChildren<TabsProps>) {
  const [tabIndex, setTabIndex] = useState(defaultTab);

  const { setSetTab } = useContext(SetTabContext);

  const onTabChange = useCallback(
    (_: unknown, i: number) => {
      setTabIndex(i as number);
      onChange?.(i as number);
    },
    [onChange]
  );

  // There are a few places where we
  // link from one tab to the other, but want to navigate without
  // reloading the page; this is a way to expose the setTab function
  useEffect(() => {
    setSetTab(onTabChange);
  }, [onTabChange, setSetTab]);

  useEffect(() => {
    setTabIndex(defaultTab);
  }, [defaultTab]);

  return (
    <MuiTabs
      defaultValue={defaultTab}
      value={tabIndex}
      onChange={onTabChange as ComponentProps<typeof MuiTabs>['onChange']}
    >
      <LabelsContainer>
        {tabLabels.map((label, index) => (
          <TabLabel index={index} key={label.label} label={label} />
        ))}
      </LabelsContainer>
      {children}
    </MuiTabs>
  );
}
