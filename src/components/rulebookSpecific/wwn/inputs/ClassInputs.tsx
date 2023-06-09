import { FlexBox } from '~/components/box/FlexBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/FormSection';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
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

  return (
    <FlexBox width="100%">
      <FlexBox flex={1} flexDirection="column" gap={16}>
        <TextInput<WwnCharacterData>
          label="Class Ability"
          name={makeAbilityFieldName('class_ability_name')}
        />
        <TextAreaInput<WwnCharacterData>
          label="Ability Description"
          name={makeAbilityFieldName('class_ability_description')}
        />
      </FlexBox>
      <DeleteButton onDelete={() => onDelete(index)} />
    </FlexBox>
  );
}

export function ClassInputs() {
  return (
    <FormSection columns={1} title="Class">
      <FlexBox flexDirection="column" gap={16}>
        <TextInput<WwnCharacterData> label="Class" name="class_name" />
        <AddAnotherMultiField<WwnCharacterData>
          HeaderRow={undefined}
          createDefaultValue={createDefaultClassAbility}
          parentFieldName="class_abilities"
        >
          {(classAbilityChildProps) => (
            <ClassAbilityField {...classAbilityChildProps} />
          )}
        </AddAnotherMultiField>
      </FlexBox>
    </FormSection>
  );
}
