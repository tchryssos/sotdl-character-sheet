/* eslint-disable @typescript-eslint/no-explicit-any */
import { startCase } from 'lodash';
import { PropsWithChildren, useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/FormSection';
import { LabelText } from '~/components/form/Label';
import { SelectInput } from '~/components/form/SelectInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { SelectOption } from '~/components/form/typings';
import { spellLevelValueToName } from '~/constants/sotww/game';
import { EditContext } from '~/logic/contexts/editContext';
import { makeDoubleNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { SortableAddAnotherChildProps } from '~/typings/form';
import {
  SotwwCharacterData,
  SotwwSpell,
  SotwwSpellCast,
} from '~/typings/sotww/characterData';

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

const createDefaultSpellCast = (): SotwwSpellCast => ({
  spell_cast: false,
});

function SpellCastWrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <FlexBox flexWrap="wrap" gap={8}>
      {children}
    </FlexBox>
  );
}

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

  const spellCastsFieldName = indexedCreateSpellFieldName('spell_casts');
  const spellCasts = watch(spellCastsFieldName) as SotwwSpellCast[];

  return (
    <FormSection
      borderless
      columns={1}
      isNested
      title={`${name} - ${startCase(spellLevelValueToName[level])}`}
    >
      <GridBox alignItems="end" gridTemplateColumns="auto 1fr">
        <SelectInput
          label="Level"
          name={levelFieldName}
          options={spellLevelOptions}
        />
        <TextInput label="Name" name={nameFieldName} />
      </GridBox>
      <TextAreaInput
        label="Description"
        name={indexedCreateSpellFieldName('spell_description')}
      />
      <FlexBox flexDirection="column" gap={8}>
        {(isEditMode || Boolean(spellCasts.length)) && (
          <LabelText>Spell Casts</LabelText>
        )}
        <AddAnotherMultiField<any>
          ChildWrapper={SpellCastWrapper}
          addLabel="+"
          createDefaultValue={createDefaultSpellCast}
          emptyLabel={null}
          parentFieldName={spellCastsFieldName}
          simpleDelete
        >
          {({ index: spellCastIndex }) => (
            <CheckboxInput
              hideLabel
              name={`${spellCastsFieldName}.${spellCastIndex}.spell_cast`}
              useX
            />
          )}
        </AddAnotherMultiField>
      </FlexBox>
      {isEditMode && (
        <FlexBox justifyContent="flex-end">
          <DeleteButton onDelete={() => onDelete(postSortIndex)} />
        </FlexBox>
      )}
    </FormSection>
  );
}
