import { ComponentProps, PropsWithChildren } from 'react';

import { FormSection } from './FormSection';

interface AAMItemFormSectionProps
  extends Pick<
    ComponentProps<typeof FormSection>,
    'title' | 'visibilityTitle' | 'columns' | 'titleColor' | 'linkId'
  > {}

export function AAMItemFormSection({
  title,
  visibilityTitle,
  columns = 1,
  children,
  titleColor,
  linkId,
}: PropsWithChildren<AAMItemFormSectionProps>) {
  return (
    <FormSection
      borderless
      columns={columns}
      isNested
      linkId={linkId}
      title={title}
      titleColor={titleColor}
      visibilityTitle={visibilityTitle}
    >
      {children}
    </FormSection>
  );
}
