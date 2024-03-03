import { useContext } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { EditContext } from '~/logic/contexts/editContext';
import { CharacterData } from '~/typings/characters';

import { AddAnotherMultiDelete } from '../buttons/DeleteButton';
import { TextInput } from './TextInput';
import { TextInputProps } from './typings';

type AAMItemTitleAndDeleteProps<T extends CharacterData> = {
  index: number;
  onDelete: (idx: number) => void;
  noDelete?: boolean;
} & Required<Pick<TextInputProps<T>, 'name' | 'label'>>;

export function AAMItemTitleAndDelete<T extends CharacterData>({
  index,
  onDelete,
  name,
  label,
  noDelete,
}: AAMItemTitleAndDeleteProps<T>) {
  const { isEditMode } = useContext(EditContext);
  return (
    <GridBox
      alignItems="end"
      gridTemplateColumns={isEditMode && !noDelete ? '1fr auto' : '1fr'}
    >
      <TextInput<T> label={label} name={name} />
      {isEditMode && !noDelete && (
        <AddAnotherMultiDelete
          disabled={index === undefined}
          onDelete={() => onDelete(index)}
        />
      )}
    </GridBox>
  );
}
