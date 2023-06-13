import styled from '@emotion/styled';
import { startCase } from 'lodash';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSection } from '~/components/form/FormSection';
import {
  NumberInput,
  NumberInputComponentProps,
} from '~/components/form/NumberInput';
import { RpgIcons } from '~/constants/icons';
import { WWN_SKILL_UNTRAINED } from '~/constants/wwn/form';
import { Skill, SKILLS } from '~/constants/wwn/game';
import { EditContext } from '~/logic/contexts/editContext';
import { WwnCharacterData } from '~/typings/wwn/characterData';

const StyledSkillInput = styled(NumberInput)<{ untrained: boolean }>(
  ({ untrained }) => ({
    ...(untrained && {
      filter: 'opacity(0)',
    }),
  })
);

interface SkillInputProps {
  skill: Skill;
}

function SkillInput({ skill }: SkillInputProps) {
  const { isEditMode } = useContext(EditContext);

  const { watch } = useFormContext<WwnCharacterData>();

  const fieldName: `skill_${Skill}` = `skill_${skill}`;

  const showUntrained = watch(fieldName) === WWN_SKILL_UNTRAINED && !isEditMode;

  return (
    <StyledSkillInput
      label={startCase(skill)}
      min={WWN_SKILL_UNTRAINED}
      name={fieldName}
      untrained={showUntrained}
    />
  );
}

export function SkillInputs() {
  return (
    <FormSection columns={4} icon={RpgIcons.Card} title="Skills">
      {SKILLS.map((s) => (
        <SkillInput key={s} skill={s} />
      ))}
    </FormSection>
  );
}
