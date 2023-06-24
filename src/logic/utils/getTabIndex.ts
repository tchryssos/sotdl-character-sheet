import { TabLabelObject } from '~/components/tabs/types';

export const getTabIndex = (tabs: TabLabelObject[], queryTab?: string) => {
  if (!queryTab) {
    return 0;
  }

  const index = tabs.findIndex(
    (tab) => tab.label.toLowerCase() === queryTab.toLowerCase()
  );

  return index > -1 ? index : 0;
};
