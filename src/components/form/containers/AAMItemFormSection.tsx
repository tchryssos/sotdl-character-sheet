import { ComponentProps, PropsWithChildren } from 'react';

import { FormSection } from './FormSection';

interface AAMItemFormSectionProps
  extends Pick<
    ComponentProps<typeof FormSection>,
    'title' | 'visibilityTitle' | 'columns'
  > {}

export function AAMItemFormSection({
  title,
  visibilityTitle,
  columns = 1,
  children,
}: PropsWithChildren<AAMItemFormSectionProps>) {
  return (
    <FormSection
      borderless
      columns={columns}
      isNested
      title={title}
      visibilityTitle={visibilityTitle}
    >
      {children}
    </FormSection>
  );
}
