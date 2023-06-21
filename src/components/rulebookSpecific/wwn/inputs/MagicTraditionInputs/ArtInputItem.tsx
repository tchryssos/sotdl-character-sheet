import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { FormSection } from '~/components/form/FormSection';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { EditContext } from '~/logic/contexts/editContext';
import { WwnMagicArt } from '~/typings/wwn/characterData';

interface ArtInputItemProps {
  parentIndex: number;
  index: number;
  onDelete: (index: number) => void;
}

const createArtFieldName = (
  fieldName: keyof WwnMagicArt,
  index: number,
  parentIndex: number
): `magic_traditions.${number}.tradition_arts.${number}.${keyof WwnMagicArt}` =>
  `magic_traditions.${parentIndex}.tradition_arts.${index}.${fieldName}`;

export function ArtInputItem({
  index,
  onDelete,
  parentIndex,
}: ArtInputItemProps) {
  const { watch } = useFormContext();
  const nameFieldName = createArtFieldName('art_name', index, parentIndex);
  const name = watch(nameFieldName) as string;
  const { isEditMode } = useContext(EditContext);

  return (
    <FormSection
      borderless
      canToggleVisibility={false}
      columns={1}
      isNested
      title={name}
    >
      <GridBox
        alignItems="end"
        gridTemplateColumns={isEditMode ? '1fr auto' : '1fr'}
      >
        <TextInput label="Name" name={nameFieldName} />
        {isEditMode && <DeleteButton onDelete={() => onDelete(index)} />}
      </GridBox>
      <TextAreaInput
        label="Description"
        name={createArtFieldName('art_description', index, parentIndex)}
      />
    </FormSection>
  );
}
