import styled from '@emotion/styled';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { TextButton } from '~/components/buttons/TextButton';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { INPUT_HEIGHT } from '~/constants/styles';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { SortableAddAnotherChildProps } from '~/typings/form';
import {
  WwnCharacterData,
  WwnSpell,
  WwnSpellSlot,
} from '~/typings/wwn/characterData';

interface SpellInputItemProps extends SortableAddAnotherChildProps {
  parentIndex: number;
}

const CastButton = styled(TextButton)`
  height: ${({ theme }) => theme.spacing[INPUT_HEIGHT]};
`;

const createSpellFieldName = (
  fieldName: keyof WwnSpell,
  index: number,
  parentIndex: number
): `magic_traditions.${number}.tradition_spells.${number}.${keyof WwnSpell}` =>
  `magic_traditions.${parentIndex}.tradition_spells.${index}.${fieldName}`;

export function SpellInputItem({
  onDeleteFn,
  sortIndexMap,
  fieldId,
  postSortIndex,
  parentIndex,
}: SpellInputItemProps) {
  const { watch, setValue } = useFormContext<WwnCharacterData>();
  const index = sortIndexMap.get(fieldId);

  const isLessThanSm = useBreakpointsLessThan('sm');
  const { isEditMode } = useContext(EditContext);

  if (index === undefined) {
    return null;
  }

  const nameFieldName = createSpellFieldName('spell_name', index, parentIndex);
  const name = watch(nameFieldName) as string;

  const levelFieldName = createSpellFieldName(
    'spell_level',
    index,
    parentIndex
  );
  const level = watch(levelFieldName) as number;

  const spellSlots = watch(
    'magic_spell_slots' as keyof WwnCharacterData
  ) as WwnSpellSlot[];

  const availableSpellSlotIndex = spellSlots?.findIndex(
    (s) => !s.spell_slot_spent
  );

  return (
    <FormSection
      borderless
      columns={1}
      isNested
      title={`${name} - Lvl ${level}`}
    >
      <FlexBox flexDirection="column" gap={16}>
        <GridBox
          alignItems="end"
          gridTemplateColumns={`auto 1fr${isEditMode ? ' auto' : ''}`}
        >
          <CheckboxInput
            label="Prepared"
            name={createSpellFieldName('spell_prepared', index, parentIndex)}
          />
          <TextInput label="Name" name={nameFieldName} />
          {isEditMode && (
            <DeleteButton onDelete={() => onDeleteFn(postSortIndex)} />
          )}
        </GridBox>
        <TextAreaInput
          label="Description"
          name={createSpellFieldName('spell_description', index, parentIndex)}
        />
        <GridBox alignItems="end">
          <NumberInput label="Spell Level" min={1} name={levelFieldName} />
          <CastButton
            disabled={availableSpellSlotIndex === -1}
            label="Cast"
            onClick={() =>
              setValue(
                `magic_spell_slots.${availableSpellSlotIndex}.spell_slot_spent`,
                true
              )
            }
          />
        </GridBox>
      </FlexBox>
    </FormSection>
  );
}
