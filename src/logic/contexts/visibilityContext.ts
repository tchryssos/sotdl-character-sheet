import { createContext } from 'react';

export type SectionInfo = {
  isVisible?: boolean;
  isExpanded?: boolean;
};

export type FieldInfo = {
  height?: number;
};

export type VisibilityObj = {
  [pageId: string]: {
    sections: {
      [sectionId: string]: SectionInfo;
    };
    fields: {
      [fieldName: string]: FieldInfo;
    };
  };
};

interface VisibilityContextState {
  visibility: VisibilityObj;

  // Section
  setSectionVisibilityInfo: <T extends keyof SectionInfo>(
    sectionTitle: string,
    visibilityKey: T,
    visibilityValue: NonNullable<SectionInfo[T]>
  ) => void;
  getSectionVisibilityInfo: (sectionTitle: string) => SectionInfo | undefined;

  // Field
  setFieldVisibilityInfo: <T extends keyof FieldInfo>(
    fieldName: string,
    fieldKey: T,
    fieldValue: NonNullable<FieldInfo[T]>
  ) => void;
  getFieldVisibilityInfo: (fieldName: string) => FieldInfo | undefined;
}

export const VisibilityContext = createContext<VisibilityContextState>({
  visibility: {},
  setSectionVisibilityInfo: () => null,
  getSectionVisibilityInfo: () => undefined,
  setFieldVisibilityInfo: () => null,
  getFieldVisibilityInfo: () => undefined,
});
