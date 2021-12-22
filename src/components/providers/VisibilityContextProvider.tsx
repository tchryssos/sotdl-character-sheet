import camelCase from 'lodash.camelcase';
import set from 'lodash.set';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';

import {
  VisibilityContext,
  VisibilityObj,
} from '~/logic/contexts/visibilityContext';

interface VisibilityContextProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const emptyVis: VisibilityObj = {};
const visKey = 'sectionVisibility';

export const VisibilityContextProvider: React.FC<VisibilityContextProviderProps> =
  ({ children }) => {
    const { asPath } = useRouter();
    const pageId = asPath.split('?')[0];

    const [visibilityObject, setVisibilityObject] = useState(emptyVis);

    const sectionVisibityString =
      globalThis.localStorage?.getItem(visKey) || '{}';

    useEffect(() => {
      setVisibilityObject(JSON.parse(sectionVisibityString));
    }, [sectionVisibityString]);

    const getVisibility = (
      sectionTitle: string
    ): VisibilityObj[string][string] | undefined =>
      visibilityObject[pageId]?.[camelCase(sectionTitle)];

    const setVisibility = (
      sectionTitle: string,
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

    return (
      <VisibilityContext.Provider
        value={{
          visbility: visibilityObject,
          getVisibility,
          setVisibility,
        }}
      >
        {children}
      </VisibilityContext.Provider>
    );
  };
