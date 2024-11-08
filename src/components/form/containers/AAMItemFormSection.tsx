import { ComponentProps, PropsWithChildren } from 'react';

import { FormSection } from './FormSection';

interface AAMItemFormSectionProps
  extends Pick<
    ComponentProps<typeof FormSection>,
    'title' | 'columns' | 'titleColor' | 'linkId'
  > {}

export function AAMItemFormSection({
  title,
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
    >
      {children}
    </FormSection>
  );
}
