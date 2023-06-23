import { TabLabelObject } from '~/components/tabs/types';

export const getTabIndex = (queryTab: string, tabs: TabLabelObject[]) => {
  const index = tabs.findIndex(
    (tab) => tab.label.toLowerCase() === queryTab.toLowerCase()
  );
  return index > -1 ? index : 0;
};
