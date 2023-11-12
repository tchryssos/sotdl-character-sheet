import { PropsWithChildren, useContext, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { ConfirmationDialog } from '~/components/dialog/ConfirmationDialog';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/FormSection';
import { LabelText } from '~/components/form/Label';
import { TextInput } from '~/components/form/TextInput';
import { RpgIcons } from '~/constants/icons';
import { FORM_ROW_GAP } from '~/constants/styles';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { SortableAddAnotherChildProps } from '~/typings/form';
import {
  SotwwCharacterData,
  SotwwMagicTradition,
  SotwwSpell,
  SotwwTraditionTalent,
} from '~/typings/sotww/characterData';

import { TraditionSpellInputItem } from './TraditionSpellInputItem';
import { TraditionTalentInputItem } from './TraditionTalentInputItem';

interface TraditionInputItemProps
  extends Omit<SortableAddAnotherChildProps, 'sortIndexMap' | 'fieldId'> {}

const createTraditionFieldName = makeNestedFieldNameFn<
  SotwwCharacterData,
  'magic_traditions'
>('magic_traditions');

const createDefaultTraditionTalent = (): SotwwTraditionTalent => ({
  talent_name: '',
  talent_description: '',
});

const createDefaultSpell = (): SotwwSpell => ({
  spell_name: '',
  spell_description: '',
  spell_level: 1,
  spell_casts: [
    {
      spell_cast: false,
    },
  ],
});

function TalentChildWrapper({ children }: PropsWithChildren<unknown>) {
  const isLessThanSm = useBreakpointsLessThan('sm');
  return <GridBox columns={isLessThanSm ? 1 : 2}>{children}</GridBox>;
}

function SpellChildWrapper({ children }: PropsWithChildren<unknown>) {
  const isLessThanMd = useBreakpointsLessThan('md');
  return <GridBox columns={isLessThanMd ? 1 : 2}>{children}</GridBox>;
}

export function TraditionInputItem({
  postSortIndex: index,
  onDelete,
}: TraditionInputItemProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { watch } = useFormContext<SotwwCharacterData>();
  const { isEditMode } = useContext(EditContext);

  const traditionNameFieldName = createTraditionFieldName(
    'tradition_name',
    index
  );
  const traditionName = watch(traditionNameFieldName);

  return (
    <>
      <FlexBox flexDirection="column" gap={FORM_ROW_GAP}>
        <FormSection
          columns={1}
          icon={RpgIcons.WandLight}
          title={`Tradition - ${traditionName}`}
        >
          <GridBox alignItems="end" gridTemplateColumns="1fr auto">
            <TextInput<SotwwCharacterData>
              label="Name"
              name={traditionNameFieldName}
            />
            {isEditMode && (
              <DeleteButton onDelete={() => setShowDeleteModal(true)} />
            )}
          </GridBox>
          <FlexBox flexDirection="column">
            <LabelText marginBottom={8}>Tradition Talents</LabelText>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <AddAnotherMultiField<any>
              ChildWrapper={TalentChildWrapper}
              addLabel={`+ Add a new ${traditionName} Talent`}
              createDefaultValue={createDefaultTraditionTalent}
              emptyLabel="Empty (use Edit Mode to add some Talents)"
              parentFieldName={createTraditionFieldName(
                'tradition_talents',
                index
              )}
            >
              {({ index: talentIndex, onDelete: talentOnDelete }) => (
                <TraditionTalentInputItem
                  parentIndex={index}
                  postSortIndex={talentIndex}
                  onDelete={talentOnDelete}
                />
              )}
            </AddAnotherMultiField>
          </FlexBox>
        </FormSection>
        <FormSection
          columns={1}
          icon={RpgIcons.Lightning}
          title={`Spells - ${traditionName}`}
        >
          <AddAnotherMultiField<SotwwMagicTradition>
            ChildWrapper={SpellChildWrapper}
            addLabel={`+ Add a new ${traditionName} Spell`}
            createDefaultValue={createDefaultSpell}
            emptyLabel="Empty (use Edit Mode to add some Spells)"
            parentFieldName={
              createTraditionFieldName(
                'tradition_spells',
                index
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ) as any
            }
            sortProperties={['spell_level', 'spell_name']}
          >
            {({
              index: spellIndex,
              onDelete: spellOnDelete,
              fieldId,
              sortIndexMap,
            }) => (
              <TraditionSpellInputItem
                fieldId={fieldId}
                parentIndex={index}
                postSortIndex={spellIndex}
                sortIndexMap={sortIndexMap}
                onDelete={spellOnDelete}
              />
            )}
          </AddAnotherMultiField>
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
        message="Deleting it will delete all the associated talents and spells as well."
        open={showDeleteModal}
        title={`Are you sure you want to delete the ${traditionName} tradition ?`}
      />
    </>
  );
}
