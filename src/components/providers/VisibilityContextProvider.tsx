import camelCase from 'lodash.camelcase';
import set from 'lodash.set';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';

import {
  FieldInfo,
  SectionInfo,
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

    const [visibilityObject, setSectionVisibilityInfoObject] =
      useState(emptyVis);

    const sectionVisibityString =
      globalThis.localStorage?.getItem(visKey) || '{}';

    useEffect(() => {
      setSectionVisibilityInfoObject(JSON.parse(sectionVisibityString));
    }, [sectionVisibityString]);

    // START - SECTION - START
    const getSectionVisibilityInfo = (sectionTitle: string) =>
      visibilityObject[camelCase(pageId)]?.sections?.[camelCase(sectionTitle)];

    const setSectionVisibilityInfo = (
      sectionTitle: string,
      visibilityKey: keyof SectionInfo,
      visibilityValue: NonNullable<SectionInfo[keyof SectionInfo]>
    ) => {
      const nextObj = set(
        visibilityObject,
        [pageId, 'sections', camelCase(sectionTitle), visibilityKey],
        visibilityValue
      );
      globalThis.localStorage?.setItem(visKey, JSON.stringify(nextObj));
      setSectionVisibilityInfoObject(nextObj);
    };
    // END - SECTION - END

    // START - FIELDS - START
    const setFieldVisibilityInfo = (
      fieldName: string,
      fieldKey: keyof FieldInfo,
      value: NonNullable<FieldInfo[keyof FieldInfo]>
    ) => {
      const nextObj = set(
        visibilityObject,
        [pageId, 'fields', camelCase(fieldName), fieldKey],
        value
      );
      globalThis.localStorage?.setItem(visKey, JSON.stringify(nextObj));
      setSectionVisibilityInfoObject(nextObj);
    };

    const getFieldVisibilityInfo = (fieldName: string) =>
      visibilityObject[pageId]?.fields?.[camelCase(fieldName)];
    // END - FIELDS - END

    return (
      <VisibilityContext.Provider
        value={{
          visibility: visibilityObject,
          getSectionVisibilityInfo,
          setSectionVisibilityInfo,
          getFieldVisibilityInfo,
          setFieldVisibilityInfo,
        }}
      >
        {children}
      </VisibilityContext.Provider>
    );
  };
