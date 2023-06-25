import styled from '@emotion/styled';
import { upperFirst } from 'lodash';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { TextButton } from '~/components/buttons/TextButton';
import { FormSection } from '~/components/form/FormSection';
import { SelectInput } from '~/components/form/SelectInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { SelectOption } from '~/components/form/typings';
import { Text } from '~/components/Text';
import { EFFORT_STATUSES, EffortStatus } from '~/constants/wwn/game';
import { EditContext } from '~/logic/contexts/editContext';
import { WwnCharacterData, WwnMagicArt } from '~/typings/wwn/characterData';

const EffortButton = styled(TextButton)`
  margin-top: ${({ theme }) => theme.spacing[8]};
`;

interface ArtInputItemProps {
  parentIndex: number;
  index: number;
  onDelete: (index: number) => void;
}

const artEffortOptions: SelectOption[] = EFFORT_STATUSES.map((status) => ({
  label: upperFirst(status === 'ready' ? 'none' : status),
  value: status,
}));

interface ArtEffortDisplayProps {
  name: string;
}

function ArtEffortDisplay({ name }: ArtEffortDisplayProps) {
  const { watch, setValue } = useFormContext<WwnCharacterData>();
  const effort = watch(name as keyof WwnCharacterData) as EffortStatus;
  const efforts = watch('magic_efforts');

  if (effort === 'ready') {
    return (
      <Text as="p" marginTop={8}>
        No effort required
      </Text>
    );
  }

  const lastUnusedEffort = efforts.findIndex(
    (e) => e.effort_status === 'ready'
  );

  const onClick = () => {
    setValue(`magic_efforts.${lastUnusedEffort}.effort_status`, effort);
  };

  return (
    <EffortButton
      disabled={lastUnusedEffort === -1}
      label={`Use ${effort} effort`}
      onClick={onClick}
    />
  );
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
    <FormSection borderless columns={1} isNested title={name}>
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
      <SelectInput
        DisplayComponent={ArtEffortDisplay}
        label="Required Effort"
        name={createArtFieldName('art_effort', index, parentIndex)}
        options={artEffortOptions}
      />
    </FormSection>
  );
}
