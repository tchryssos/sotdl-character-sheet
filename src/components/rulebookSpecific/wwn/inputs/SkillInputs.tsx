import { startCase } from 'lodash';
import { useContext, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/FormSection';
import { Label } from '~/components/form/Label';
import { NumberInput } from '~/components/form/NumberInput';
import { Text } from '~/components/Text';
import { RpgIcons } from '~/constants/icons';
import { WWN_SKILL_UNTRAINED } from '~/constants/wwn/form';
import { Skill, SKILLS } from '~/constants/wwn/game';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { WwnCharacterData } from '~/typings/wwn/characterData';

interface SkillInputProps {
  skill: Skill;
  hideUntrained: boolean;
}

function SkillInput({ skill, hideUntrained }: SkillInputProps) {
  const { isEditMode } = useContext(EditContext);

  const { watch } = useFormContext<WwnCharacterData>();

  const fieldName: `skill_${Skill}` = `skill_${skill}`;

  const showUntrained = watch(fieldName) === WWN_SKILL_UNTRAINED && !isEditMode;

  const untrainedId = `untrained-${skill}`;

  if (hideUntrained && showUntrained) {
    return null;
  }

  return showUntrained ? (
    <Label label={startCase(skill)} labelFor={untrainedId}>
      <Text display="block" id={untrainedId} marginTop={8} variant="body-sm">
        Untrained
      </Text>
    </Label>
  ) : (
    <NumberInput
      label={startCase(skill)}
      min={WWN_SKILL_UNTRAINED}
      name={fieldName}
    />
  );
}

const untrainedSkillLSKey = 'showUntrainedSkills';

export function SkillInputs() {
  const isLessThanSm = useBreakpointsLessThan('sm');
  const isXxs = useBreakpointsLessThan('xs');

  const [untrainedHidden, setUntrainedHidden] = useState(
    globalThis?.localStorage?.getItem(untrainedSkillLSKey) === 'true'
  );

  const onToggleUntrained = () => {
    const nextValue = !untrainedHidden;
    setUntrainedHidden(nextValue);
    globalThis?.localStorage?.setItem(
      untrainedSkillLSKey,
      nextValue.toString()
    );
  };

  return (
    <FormSection columns={1} icon={RpgIcons.Card} title="Skills">
      {/* eslint-disable-next-line no-nested-ternary */}
      <GridBox columns={isXxs ? 2 : isLessThanSm ? 3 : 4}>
        {SKILLS.map((s) => (
          <SkillInput hideUntrained={untrainedHidden} key={s} skill={s} />
        ))}
      </GridBox>
      <CheckboxInput
        alwaysEditable
        customOnChange={onToggleUntrained}
        inputLike
        isChecked={untrainedHidden}
        name="Hide Untrained"
        size="sm"
      />
    </FormSection>
  );
}
