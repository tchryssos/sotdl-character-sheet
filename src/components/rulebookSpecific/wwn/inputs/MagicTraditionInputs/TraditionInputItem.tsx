import { PropsWithChildren } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/FormSection';
import { LabelText } from '~/components/form/Label';
import { TextInput } from '~/components/form/TextInput';
import { RpgIcons } from '~/constants/icons';
import { FORM_ROW_GAP } from '~/constants/styles';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import {
  WwnCharacterData,
  WwnMagicArt,
  WwnSpell,
  WwnTradition,
} from '~/typings/wwn/characterData';

import { ArtInputItem } from './ArtInputItem';
import { SpellInputItem } from './SpellInputItem';

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
  const { watch } = useFormContext<WwnCharacterData>();

  const nameFieldName = createTraditionFieldName('tradition_name', index);
  const name = watch(nameFieldName) as string;

  return (
    <FlexBox flexDirection="column" gap={FORM_ROW_GAP}>
      <FormSection
        columns={1}
        icon={RpgIcons.WandLight}
        title={`Tradition - ${name}`}
      >
        <TextInput<WwnCharacterData> label="Name" name={nameFieldName} />
        <FlexBox flexDirection="column">
          <LabelText marginBottom={8}>Magic Arts</LabelText>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <AddAnotherMultiField<any>
            ChildWrapper={ArtChildWrapper}
            createDefaultValue={createDefaultTraditionArt}
            emptyLabel="Empty (use Edit Mode to add some Arts)"
            parentFieldName={createTraditionFieldName('tradition_arts', index)}
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
              onDeleteFn={spellOnDelete}
            />
          )}
        </AddAnotherMultiField>
      </FormSection>
    </FlexBox>
  );
}
