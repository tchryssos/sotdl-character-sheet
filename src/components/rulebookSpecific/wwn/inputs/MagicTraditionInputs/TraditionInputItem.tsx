import { PropsWithChildren } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/FormSection';
import { Label } from '~/components/form/Label';
import { TextInput } from '~/components/form/TextInput';
import { RpgIcons } from '~/constants/icons';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import {
  WwnCharacterData,
  WwnMagicArt,
  WwnTradition,
} from '~/typings/wwn/characterData';

import { ArtInputItem } from './ArtInputItem';

interface TraditionInputItemProps {
  index: number;
  onDelete: (index: number) => void;
}

const createDefaultTraditionArt = (): WwnMagicArt => ({
  art_name: '',
  art_description: '',
  art_effort: 'ready',
});

function ArtChildWrapper({ children }: PropsWithChildren<unknown>) {
  const isLessThanSm = useBreakpointsLessThan('sm');
  return <GridBox columns={isLessThanSm ? 1 : 2}>{children}</GridBox>;
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
    <>
      <FormSection
        columns={1}
        icon={RpgIcons.WandLight}
        title={`Tradition - ${name}`}
      >
        <TextInput<WwnCharacterData> label="Name" name={nameFieldName} />
        <Label label="Magic Arts">
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
        </Label>
      </FormSection>
    </>
  );
}
