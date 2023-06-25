import styled from '@emotion/styled';
import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { ConfirmationDialog } from '~/components/dialog/ConfirmationDialog';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/FormSection';
import { LabelText } from '~/components/form/Label';
import { TextInput } from '~/components/form/TextInput';
import { RpgIcons } from '~/constants/icons';
import { FORM_ROW_GAP } from '~/constants/styles';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { SortableAddAnotherChildProps } from '~/typings/form';
import {
  WwnCharacterData,
  WwnMagicArt,
  WwnSpell,
  WwnTradition,
} from '~/typings/wwn/characterData';

import { ArtInputItem } from './ArtInputItem';
import { SpellInputItem } from './SpellInputItem';

const HideSpellsCheckbox = styled(CheckboxInput)`
  text-align: right;
`;

interface TraditionInputItemProps {
  index: number;
  onDelete: (index: number) => void;
}

const createDefaultTraditionArt = (): WwnMagicArt => ({
  art_name: '',
  art_description: '',
  art_effort: 'ready',
});

const createDefaultSpell = (): WwnSpell => ({
  spell_name: '',
  spell_description: '',
  spell_level: 1,
  spell_prepared: false,
});

const HIDE_SPELLS_LOCAL_STORAGE_KEY = 'wwn_hide_unprepared_spells';

function ArtChildWrapper({ children }: PropsWithChildren<unknown>) {
  const isLessThanSm = useBreakpointsLessThan('sm');
  return <GridBox columns={isLessThanSm ? 1 : 2}>{children}</GridBox>;
}

function SpellChildWrapper({ children }: PropsWithChildren<unknown>) {
  const isLessThanMd = useBreakpointsLessThan('md');
  return <GridBox columns={isLessThanMd ? 1 : 2}>{children}</GridBox>;
}

const createTraditionFieldName = (
  fieldName: keyof WwnTradition,
  index: number
): `magic_traditions.${number}.${keyof WwnTradition}` =>
  `magic_traditions.${index}.${fieldName}`;

export function TraditionInputItem({
  index,
  onDelete,
}: TraditionInputItemProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { isEditMode } = useContext(EditContext);
  const { watch, getValues } = useFormContext<WwnCharacterData>();

  const nameFieldName = createTraditionFieldName('tradition_name', index);
  const name = watch(nameFieldName) as string;

  // START - UNPREPARED SPELLS - START
  const [hideUnprepared, setHideUnprepared] = useState(
    globalThis?.localStorage.getItem(HIDE_SPELLS_LOCAL_STORAGE_KEY) === 'true'
  );

  useEffect(() => {
    if (isEditMode) {
      setHideUnprepared(false);
    } else {
      setHideUnprepared(
        globalThis?.localStorage.getItem(HIDE_SPELLS_LOCAL_STORAGE_KEY) ===
          'true'
      );
    }
  }, [isEditMode]);

  const onHideUnpreparedSpells = () => {
    const nextUnprepared = !hideUnprepared;
    setHideUnprepared(nextUnprepared);
    globalThis?.localStorage.setItem(
      HIDE_SPELLS_LOCAL_STORAGE_KEY,
      nextUnprepared.toString()
    );
  };

  const filterUnpreparedSpells = ({
    fieldId,
    sortIndexMap,
  }: SortableAddAnotherChildProps) => {
    const trueFieldIndex = sortIndexMap.get(fieldId);

    if (trueFieldIndex === undefined) {
      return false;
    }

    if (!isEditMode && hideUnprepared) {
      const spells = getValues(
        createTraditionFieldName('tradition_spells', index)
      ) as WwnSpell[];

      const spell = spells[trueFieldIndex];

      if (!spell.spell_prepared) {
        return false;
      }
    }

    return true;
  };
  // END - UNPREPARED SPELLS - END

  return (
    <>
      <FlexBox flexDirection="column" gap={FORM_ROW_GAP}>
        <FormSection
          columns={1}
          icon={RpgIcons.WandLight}
          title={`Tradition - ${name}`}
        >
          <GridBox alignItems="end" gridTemplateColumns="1fr auto">
            <TextInput<WwnCharacterData> label="Name" name={nameFieldName} />
            {isEditMode && (
              <DeleteButton onDelete={() => setShowDeleteModal(true)} />
            )}
          </GridBox>
          <FlexBox flexDirection="column">
            <LabelText marginBottom={8}>Magic Arts</LabelText>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <AddAnotherMultiField<any>
              ChildWrapper={ArtChildWrapper}
              createDefaultValue={createDefaultTraditionArt}
              emptyLabel="Empty (use Edit Mode to add some Arts)"
              parentFieldName={createTraditionFieldName(
                'tradition_arts',
                index
              )}
            >
              {({ index: artIndex, onDelete: artOnDelete, fieldId }) => (
                <ArtInputItem
                  index={artIndex}
                  key={fieldId}
                  parentIndex={index}
                  onDelete={artOnDelete}
                />
              )}
            </AddAnotherMultiField>
          </FlexBox>
        </FormSection>
        <FormSection
          columns={1}
          icon={RpgIcons.Lightning}
          title={`Spells - ${name}`}
        >
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <AddAnotherMultiField<WwnTradition>
            ChildWrapper={SpellChildWrapper}
            createDefaultValue={createDefaultSpell}
            filterFn={filterUnpreparedSpells}
            parentFieldName={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              createTraditionFieldName('tradition_spells', index) as any
            }
            sortProperties={['spell_level', 'spell_name']}
          >
            {({
              index: spellIndex,
              onDelete: spellOnDelete,
              fieldId,
              sortIndexMap,
            }) => (
              <SpellInputItem
                fieldId={fieldId}
                key={fieldId}
                parentIndex={index}
                postSortIndex={spellIndex}
                sortIndexMap={sortIndexMap}
                onDelete={spellOnDelete}
              />
            )}
          </AddAnotherMultiField>
          {!isEditMode && (
            <FlexBox justifyContent="flex-end">
              <HideSpellsCheckbox
                alwaysEditable
                customOnChange={onHideUnpreparedSpells}
                inputLike
                isChecked={hideUnprepared}
                name="Hide Unprepared Spells"
                size="sm"
              />
            </FlexBox>
          )}
        </FormSection>
      </FlexBox>
      <ConfirmationDialog
        cancel={{
          onClick: () => setShowDeleteModal(false),
          label: 'Cancel',
        }}
        confirm={{
          onClick: () => onDelete(index),
          label: 'Delete Tradition',
          severity: 'danger',
        }}
        describedById="delete-tradition-description"
        labeledById="delete-tradition"
        message="Deleting it will delete all the associated arts and spells as well."
        open={showDeleteModal}
        title="Are you sure you want to delete this Tradition?"
      />
    </>
  );
}
