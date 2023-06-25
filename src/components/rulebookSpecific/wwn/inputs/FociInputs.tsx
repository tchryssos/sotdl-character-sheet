import { PropsWithChildren, useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiDelete } from '~/components/buttons/DeleteButton';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
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
  const { isEditMode } = useContext(EditContext);
  const { watch } = useFormContext();

  const makeFocusFieldName = createMakeFocusFieldName(index);

  const focusNameFieldName = makeFocusFieldName('focus_name');
  const focusLevelFieldName = makeFocusFieldName('focus_level');

  const sectionTitle = `${watch(focusNameFieldName)}: Lvl ${watch(
    focusLevelFieldName
  )}`;

  return (
    <FormSection
      borderless
      columns={1}
      isNested
      title={sectionTitle}
      visibilityTitle={`focus${index}`}
    >
      <GridBox
        alignItems="end"
        gridTemplateColumns={isEditMode ? '1fr auto' : '1fr'}
      >
        <TextInput<WwnCharacterData> label="Name" name={focusNameFieldName} />
        {isEditMode && (
          <AddAnotherMultiDelete
            disabled={index === undefined}
            onDelete={() => onDelete(index)}
          />
        )}
      </GridBox>
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
    </FormSection>
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
