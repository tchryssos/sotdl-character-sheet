import camelCase from 'lodash.camelcase';
import { useEffect, useState } from 'react';

type VisibilityObj = {
  [key: string]: {
    [key: string]: boolean;
  };
};

const visKey = 'sectionVisibility';

const emptyVis: VisibilityObj = {};

export const useSectionVisibility = () => {
  const [visibilityObject, setVisibilityObject] = useState(emptyVis);
  const sectionVisibityString =
    globalThis.localStorage?.getItem(visKey) || '{}';

  useEffect(() => {
    setVisibilityObject(JSON.parse(sectionVisibityString));
  }, [sectionVisibityString]);

  const getSectionVisibility = (
    pageId: string,
    sectionTitle: string
  ): boolean | undefined => visibilityObject[pageId]?.[camelCase(sectionTitle)];

  const setSectionVisibility = (
    pageId: string,
    title: string,
    isVisible: boolean
  ) => {
    globalThis.localStorage?.setItem(
      visKey,
      JSON.stringify({
        ...visibilityObject,
        [pageId]: {
          ...visibilityObject[pageId],
          [camelCase(title)]: isVisible,
        },
      })
    );
  };

  return { setSectionVisibility, getSectionVisibility };
};
