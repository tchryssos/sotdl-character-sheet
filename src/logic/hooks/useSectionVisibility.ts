import camelCase from 'lodash.camelcase';
import set from 'lodash.set';
import { useEffect, useState } from 'react';

type VisibilityObj = {
  [key: string]: {
    [key: string]: {
      isVisible: boolean;
      isExpanded: boolean;
    };
  };
};

const visKey = 'sectionVisibility';

const emptyVis: VisibilityObj = {};

export const useSectionVisibility = (pageId: string, sectionTitle: string) => {
  const [visibilityObject, setVisibilityObject] = useState(emptyVis);
  const sectionVisibityString =
    globalThis.localStorage?.getItem(visKey) || '{}';

  useEffect(() => {
    setVisibilityObject(JSON.parse(sectionVisibityString));
  }, [sectionVisibityString]);

  const getSectionVisibility = (): VisibilityObj[string][string] | undefined =>
    visibilityObject[pageId]?.[camelCase(sectionTitle)];

  const setSectionVisibility = (
    visibilityKey: 'isVisible' | 'isExpanded',
    visibilityValue: boolean
  ) => {
    const nextObj = set(
      visibilityObject,
      [pageId, camelCase(sectionTitle), visibilityKey],
      visibilityValue
    );
    globalThis.localStorage?.setItem(visKey, JSON.stringify(nextObj));
    setVisibilityObject(nextObj);
  };

  return { setSectionVisibility, getSectionVisibility };
};
