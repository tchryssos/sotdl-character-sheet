import { startCase } from 'lodash';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { FormSection } from '~/components/form/FormSection';
import { SelectInput } from '~/components/form/SelectInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { SelectOption } from '~/components/form/typings';
import { spellLevelValueToName } from '~/constants/sotww/game';
import { EditContext } from '~/logic/contexts/editContext';
import { makeDoubleNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { SortableAddAnotherChildProps } from '~/typings/form';
import { SotwwCharacterData, SotwwSpell } from '~/typings/sotww/characterData';

interface SpellInputItemProps extends SortableAddAnotherChildProps {
  parentIndex: number;
}

const spellLevelOptions: SelectOption<`${SotwwSpell['spell_level']}`>[] =
  Object.entries(spellLevelValueToName).map(([value, levelName]) => ({
    value: String(value) as `${SotwwSpell['spell_level']}`,
    label: startCase(levelName),
  }));

const createSpellFieldName = makeDoubleNestedFieldNameFn<
  SotwwCharacterData,
  'magic_traditions',
  'tradition_spells'
>('magic_traditions', 'tradition_spells');

export function TraditionSpellInputItem({
  postSortIndex,
  onDelete,
  fieldId,
  sortIndexMap,
  parentIndex,
}: SpellInputItemProps) {
  const { isEditMode } = useContext(EditContext);
  const { watch, setValue } = useFormContext();
  const index = sortIndexMap.get(fieldId);

  if (index === undefined) {
    return null;
  }

  const indexedCreateSpellFieldName = (fieldName: keyof SotwwSpell) =>
    createSpellFieldName(parentIndex, fieldName, index);

  const nameFieldName = indexedCreateSpellFieldName('spell_name');
  const name = watch(nameFieldName) as string;

  const levelFieldName = indexedCreateSpellFieldName('spell_level');
  const level = watch(levelFieldName) as SotwwSpell['spell_level'];

  return (
    <FormSection
      borderless
      columns={1}
      isNested
      title={`${name} - ${startCase(spellLevelValueToName[level])}`}
    >
      <FlexBox flexDirection="column" gap={16}>
        <GridBox alignItems="end" gridTemplateColumns="auto 1fr">
          <SelectInput
            label="Level"
            name={levelFieldName}
            options={spellLevelOptions}
          />
          <TextInput label="Name" name={nameFieldName} />
          {/* {isEditMode && (
            <DeleteButton onDelete={() => onDelete(postSortIndex)} />
          )} */}
        </GridBox>
        <TextAreaInput
          label="Description"
          name={indexedCreateSpellFieldName('spell_description')}
        />
      </FlexBox>
    </FormSection>
  );
}
