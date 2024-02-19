import { ComponentProps, PropsWithChildren } from 'react';

import { FormSection } from './FormSection';

interface AAMItemFormSectionProps
  extends Pick<
    ComponentProps<typeof FormSection>,
    'title' | 'visibilityTitle' | 'columns' | 'titleColor'
  > {}

export function AAMItemFormSection({
  title,
  visibilityTitle,
  columns = 1,
  children,
  titleColor,
}: PropsWithChildren<AAMItemFormSectionProps>) {
  return (
    <FormSection
      borderless
      columns={columns}
      isNested
      title={title}
      titleColor={titleColor}
      visibilityTitle={visibilityTitle}
    >
      {children}
    </FormSection>
  );
}
