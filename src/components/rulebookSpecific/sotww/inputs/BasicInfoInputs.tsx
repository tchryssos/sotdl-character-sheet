import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box } from '~/components/box/Box';
import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { CharacterPortrait } from '~/components/form/CharacterPortrait';
import { FormSection } from '~/components/form/containers/FormSection';
import { ImageUrlInput } from '~/components/form/ImageUrlInput';
import { NumberInput } from '~/components/form/NumberInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
import {
  useBreakpointsAtLeast,
  useBreakpointsLessThan,
} from '~/logic/hooks/useBreakpoints';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

const imageSize = 144;

export function BasicInfoInputs() {
  const isLessThanXs = useBreakpointsLessThan('xs');
  const isAtLeastSm = useBreakpointsAtLeast('sm');

  const { watch } = useFormContext<SotwwCharacterData>();
  const { isEditMode } = useContext(EditContext);

  const imageUrl = watch('image_url');

  const showImageInline = !isEditMode && imageUrl && !isLessThanXs;
  return (
    <FormSection columns={1} icon={RpgIcons.SinglePage} title="Basic Info">
      <FlexBox flexDirection="column" gap={16}>
        {isEditMode && <ImageUrlInput<SotwwCharacterData> name="image_url" />}

        <GridBox
          gap={16}
          gridTemplateColumns={showImageInline ? 'auto 1fr' : '1fr'}
        >
          {showImageInline && (
            <Box alignItems="center" display="flex">
              <CharacterPortrait
                alt={watch('name')}
                height={imageSize}
                src={imageUrl}
              />
            </Box>
          )}
          <FlexBox flexDirection="column" gap={16}>
            <TextInput<SotwwCharacterData> name="name" />

            <Box maxWidth={showImageInline && !isAtLeastSm ? '50%' : '30%'}>
              <NumberInput<SotwwCharacterData> max={10} min={1} name="level" />
            </Box>
          </FlexBox>
        </GridBox>
        <TextAreaInput<SotwwCharacterData> name="description" />
        <FlexBox flexDirection={isLessThanXs ? 'column' : 'row'} gap={16}>
          <TextAreaInput<SotwwCharacterData> name="languages" />
          <TextAreaInput<SotwwCharacterData> name="professions" />
        </FlexBox>
      </FlexBox>
    </FormSection>
  );
}
