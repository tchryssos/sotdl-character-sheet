import { PropsWithChildren } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { AAMItemTitleAndDelete } from '~/components/form/AAMItemTitleAndDelete';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { AAMItemFormSection } from '~/components/form/containers/AAMItemFormSection';
import { FormSection } from '~/components/form/containers/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { RpgIcons } from '~/constants/icons';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { WwnCharacterData, WwnFocus } from '~/typings/wwn/characterData';

interface FocusItemProps {
  index: number;
  onDelete: (idx: number) => void;
}

const createMakeFocusFieldName =
  (index: number) =>
  (focusKey: keyof WwnFocus): `foci.${number}.${keyof WwnFocus}` =>
    `foci.${index}.${focusKey}`;

function FocusItem({ index, onDelete }: FocusItemProps) {
  const { watch } = useFormContext();

  const makeFocusFieldName = createMakeFocusFieldName(index);

  const focusNameFieldName = makeFocusFieldName('focus_name');
  const focusLevelFieldName = makeFocusFieldName('focus_level');

  const sectionTitle = `${watch(focusNameFieldName)}: Lvl ${watch(
    focusLevelFieldName
  )}`;

  return (
    <AAMItemFormSection title={sectionTitle}>
      <AAMItemTitleAndDelete<WwnCharacterData>
        index={index}
        label="Name"
        name={focusNameFieldName}
        onDelete={onDelete}
      />
      <TextAreaInput<WwnCharacterData>
        label="Description"
        name={makeFocusFieldName('focus_description')}
      />
      <NumberInput<WwnCharacterData>
        label="Level"
        max={2}
        min={1}
        name={focusLevelFieldName}
      />
    </AAMItemFormSection>
  );
}

const createDefaultFocus = (): WwnFocus => ({
  focus_name: '',
  focus_description: '',
  focus_level: 1,
});

function FociChildWrapper({ children }: PropsWithChildren<unknown>) {
  const isLessThanSm = useBreakpointsLessThan('sm');
  return <GridBox columns={isLessThanSm ? 1 : 2}>{children}</GridBox>;
}

export function FociInputs() {
  return (
    <FormSection columns={1} icon={RpgIcons.Lightbulb} title="Foci">
      <AddAnotherMultiField<WwnCharacterData>
        ChildWrapper={FociChildWrapper}
        createDefaultValue={createDefaultFocus}
        parentFieldName="foci"
      >
        {(childProps) => <FocusItem {...childProps} />}
      </AddAnotherMultiField>
    </FormSection>
  );
}
