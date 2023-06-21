import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiDelete } from '~/components/buttons/DeleteButton';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/FormSection';
import { Label } from '~/components/form/Label';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { WwnCharacterData, WwnClassAbility } from '~/typings/wwn/characterData';

const createDefaultClassAbility = (): WwnClassAbility => ({
  class_ability_name: '',
  class_ability_description: '',
});

const createMakeAbilityFieldName =
  (index: number) =>
  (
    abilityKey: keyof WwnClassAbility
  ): `class_abilities.${number}.${keyof WwnClassAbility}` =>
    `class_abilities.${index}.${abilityKey}`;

interface ClassAbilityFieldProps {
  index: number;
  onDelete: (index: number) => void;
}

function ClassAbilityField({ index, onDelete }: ClassAbilityFieldProps) {
  const makeAbilityFieldName = createMakeAbilityFieldName(index);
  const { watch } = useFormContext();
  const { isEditMode } = useContext(EditContext);

  const name =
    watch(makeAbilityFieldName('class_ability_name')) ||
    `Class Ability ${index + 1}`;

  return (
    <FormSection
      borderless
      columns={1}
      isNested
      title={name}
      visibilityTitle={`ability${index}`}
    >
      <GridBox
        alignItems="end"
        gridTemplateColumns={isEditMode ? '1fr auto' : '1fr'}
      >
        <TextInput<WwnCharacterData>
          label="Name"
          name={makeAbilityFieldName('class_ability_name')}
        />
        {isEditMode && (
          <AddAnotherMultiDelete onDelete={() => onDelete(index)} />
        )}
      </GridBox>
      <TextAreaInput<WwnCharacterData>
        label="Ability Description"
        name={makeAbilityFieldName('class_ability_description')}
      />
    </FormSection>
  );
}

function ClassChildWrapper({ children }: { children?: React.ReactNode }) {
  const isLessThanSm = useBreakpointsLessThan('sm');
  return <GridBox columns={isLessThanSm ? 1 : 2}>{children}</GridBox>;
}

export function ClassInputs() {
  return (
    <FormSection columns={1} icon={RpgIcons.FlowerOne} title="Class">
      <FlexBox flexDirection="column" gap={16}>
        <TextInput<WwnCharacterData> label="Class" name="class_name" />
        <Label label="Class Abilities">
          <AddAnotherMultiField<WwnCharacterData>
            ChildWrapper={ClassChildWrapper}
            HeaderRow={undefined}
            createDefaultValue={createDefaultClassAbility}
            parentFieldName="class_abilities"
          >
            {(classAbilityChildProps) => (
              <ClassAbilityField {...classAbilityChildProps} />
            )}
          </AddAnotherMultiField>
        </Label>
      </FlexBox>
    </FormSection>
  );
}
