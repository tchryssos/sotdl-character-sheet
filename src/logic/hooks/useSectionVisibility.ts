import { useEffect, useState } from 'react';

type VisibilityTriplet = `${string}:${string}:${boolean}`;

type VisibilityObj = {
  [key: string]: {
    [key: string]: boolean;
  };
};

const visKey = 'sectionVisibility';

const emptyVis: VisibilityObj = {};

export const useSectionVisibility = () => {
  const [visibilityObject, setVisibilityObject] = useState(emptyVis);
  const sectionVisibityString = globalThis.localStorage?.getItem(visKey) || '';

  useEffect(() => {
    if (sectionVisibityString !== undefined) {
      const visibilityTriplets = sectionVisibityString.split(' ') as
        | VisibilityTriplet[];

      setVisibilityObject(
        visibilityTriplets.reduce((acc, curr) => {
          const [pageId, sectionTitle, isVisible] = curr.split(':') as [
            string,
            string,
            `${boolean}`
          ];

          acc[pageId] = {
            ...acc[pageId],
            [sectionTitle]: isVisible === 'true',
          };

          return acc;
        }, {} as VisibilityObj)
      );
    }
  }, [sectionVisibityString]);

  const getSectionVisibility = (
    pageId: string,
    sectionTitle: string
  ): boolean | undefined => visibilityObject[pageId]?.[sectionTitle];

  const setSectionVisibility = (
    pageId: string,
    title: string,
    isVisible: boolean
  ) => {
    localStorage.setItem(
      visKey,
      `${pageId}:${title}${isVisible} ${sectionVisibityString}`
    );
  };

  return { visibilityObject, setSectionVisibility, getSectionVisibility };
};
