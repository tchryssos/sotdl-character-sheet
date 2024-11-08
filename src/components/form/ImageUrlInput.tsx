import { FlexBox } from '../box/FlexBox';
import { ImagePreview } from '../ImagePreview';
import { TextInput } from './TextInput';
import { KeyName } from './typings';

type ImageUrlInputProps<T extends Record<string, unknown>> = {
  name: KeyName<T>;
};

export function ImageUrlInput<T extends Record<string, unknown>>({
  name,
}: ImageUrlInputProps<T>) {
  return (
    <FlexBox flexDirection="column" gap={16}>
      <TextInput<T> name={name} />
      <ImagePreview altText="Character Image" imageKey={name} />
    </FlexBox>
  );
}
