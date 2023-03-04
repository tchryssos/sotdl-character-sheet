import { camelCase, set } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

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

export function VisibilityContextProvider({
  children,
}: VisibilityContextProviderProps) {
  const { asPath } = useRouter();
  const pageId = camelCase(asPath.split('?')[0]);

  const [visibilityObject, setSectionVisibilityInfoObject] = useState(emptyVis);

  const sectionVisibilityString =
    globalThis.localStorage?.getItem(visKey) || '{}';

  useEffect(() => {
    setSectionVisibilityInfoObject(JSON.parse(sectionVisibilityString));
  }, [sectionVisibilityString]);

  // START - SECTION - START
  const getSectionVisibilityInfo = useCallback(
    (sectionTitle: string) =>
      visibilityObject[pageId]?.sections?.[camelCase(sectionTitle)],
    [pageId, visibilityObject]
  );

  const setSectionVisibilityInfo = useCallback(
    (
      sectionTitle: string,
      visibilityKey: keyof SectionInfo,
      visibilityValue: NonNullable<SectionInfo[keyof SectionInfo]>
    ) => {
      const nextObj = set(
        { ...visibilityObject },
        [pageId, 'sections', camelCase(sectionTitle), visibilityKey],
        visibilityValue
      );
      globalThis.localStorage?.setItem(visKey, JSON.stringify(nextObj));
      setSectionVisibilityInfoObject(nextObj);
    },
    [pageId, visibilityObject]
  );
  // END - SECTION - END

  // START - FIELDS - START
  const setFieldVisibilityInfo = useCallback(
    (
      fieldName: string,
      fieldKey: keyof FieldInfo,
      value: NonNullable<FieldInfo[keyof FieldInfo]>
    ) => {
      const nextObj = set(
        { ...visibilityObject },
        [pageId, 'fields', camelCase(fieldName), fieldKey],
        value
      );
      globalThis.localStorage?.setItem(visKey, JSON.stringify(nextObj));
      setSectionVisibilityInfoObject(nextObj);
    },
    [pageId, visibilityObject]
  );

  const getFieldVisibilityInfo = useCallback(
    (fieldName: string) =>
      visibilityObject[pageId]?.fields?.[camelCase(fieldName)],
    [pageId, visibilityObject]
  );
  // END - FIELDS - END

  const providerValue = useMemo(
    () => ({
      visibility: visibilityObject,
      getSectionVisibilityInfo,
      setSectionVisibilityInfo,
      getFieldVisibilityInfo,
      setFieldVisibilityInfo,
    }),
    [
      visibilityObject,
      getSectionVisibilityInfo,
      setSectionVisibilityInfo,
      getFieldVisibilityInfo,
      setFieldVisibilityInfo,
    ]
  );

  return (
    <VisibilityContext.Provider value={providerValue}>
      {children}
    </VisibilityContext.Provider>
  );
}
