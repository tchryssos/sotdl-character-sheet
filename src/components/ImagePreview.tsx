import { startCase } from 'lodash';
import { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from './box/FlexBox';
import { Text } from './Text';

interface ImagePreviewProps {
  imageKey: string;
  altText: string;
  PreviewComponent?: React.ComponentType<{
    alt: string;
    src: string;
  }>;
}

function ImageComponent({
  src,
  alt,
  PreviewComponent,
}: Pick<ImagePreviewProps, 'PreviewComponent'> &
  ComponentProps<NonNullable<ImagePreviewProps['PreviewComponent']>>) {
  if (PreviewComponent) {
    return <PreviewComponent alt={alt} src={src} />;
  }

  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt={alt} height={100} src={src} />
    </div>
  );
}

export function ImagePreview({
  imageKey,
  altText,
  PreviewComponent,
}: ImagePreviewProps) {
  const { watch } = useFormContext();
  const image = watch(imageKey);

  if (!image) return null;

  return (
    <FlexBox flexDirection="column" gap={4}>
      <Text color="textAccent" variant="body-sm">
        {startCase(imageKey)} Preview
      </Text>
      <ImageComponent
        PreviewComponent={PreviewComponent}
        alt={altText}
        src={image}
      />
    </FlexBox>
  );
}
