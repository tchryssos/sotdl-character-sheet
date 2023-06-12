import styled from '@emotion/styled';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/FormSection';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
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

const ClassDelete = styled(DeleteButton)`
  margin-top: ${pxToRem(17)};
`;

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
      canToggleVisibility={false}
      gridTemplateColumns={isEditMode ? '1fr auto' : '1fr'}
      title={`Class Ability ${index + 1}: ${name}`}
      visibilityTitle={`ability${index}`}
    >
      <FlexBox flex={1} flexDirection="column" gap={16}>
        <TextInput<WwnCharacterData>
          label="Name"
          name={makeAbilityFieldName('class_ability_name')}
        />
        <TextAreaInput<WwnCharacterData>
          label="Ability Description"
          name={makeAbilityFieldName('class_ability_description')}
        />
      </FlexBox>
      {isEditMode && <ClassDelete onDelete={() => onDelete(index)} />}
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
      </FlexBox>
    </FormSection>
  );
}
