import styled from '@emotion/styled';
import { Tabs as MuiTabs, TabsList } from '@mui/base';
import {
  ComponentProps,
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';

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

type SetTabContext = (_: unknown, index: number) => void;

export const SetTabContext = createContext<SetTabContext>(() => null);

export function Tabs({
  tabLabels,
  defaultTab = 0,
  children,
  onChange,
}: PropsWithChildren<TabsProps>) {
  const [tabIndex, setTabIndex] = useState(defaultTab);

  const onTabChange = useCallback(
    (_: unknown, i: number) => {
      setTabIndex(i as number);
      onChange?.(i as number);
    },
    [onChange]
  );

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
      <SetTabContext.Provider value={onTabChange}>
        {children}
      </SetTabContext.Provider>
    </MuiTabs>
  );
}
