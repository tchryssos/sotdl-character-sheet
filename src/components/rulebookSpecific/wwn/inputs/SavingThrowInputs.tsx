import { max } from 'lodash';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { WwnCharacterData } from '~/typings/wwn/characterData';

const savingThrowCalc = (attr: number, level: number) => 16 - level - attr;

enum SavingThrows {
  PHYSICAL = 'save_physical',
  MENTAL = 'save_mental',
  EVASION = 'save_evasion',
  LUCK = 'save_luck',
}

export function SavingThrowInputs() {
  const { watch, register, setValue } = useFormContext();

  const strength: number = watch<keyof WwnCharacterData>('attribute_strength');
  const dexterity: number = watch<keyof WwnCharacterData>(
    'attribute_dexterity'
  );
  const constitution: number = watch<keyof WwnCharacterData>(
    'attribute_constitution'
  );
  const intelligence: number = watch<keyof WwnCharacterData>(
    'attribute_intelligence'
  );
  const wisdom: number = watch<keyof WwnCharacterData>('attribute_wisdom');
  const charisma: number = watch<keyof WwnCharacterData>('attribute_charisma');
  const level: number = watch<keyof WwnCharacterData>('level');

  useEffect(() => {
    Object.values(SavingThrows).forEach((savingThrow) => {
      register(savingThrow);
    });
  }, [register]);

  useEffect(() => {
    setValue(
      SavingThrows.PHYSICAL,
      savingThrowCalc(max([strength, constitution])!, level)
    );
  }, [strength, constitution, level, setValue]);

  useEffect(() => {
    setValue(SavingThrows.LUCK, 16 - level);
  }, [level, setValue]);

  useEffect(() => {
    setValue(
      SavingThrows.MENTAL,
      savingThrowCalc(max([charisma, wisdom])!, level)
    );
  }, [charisma, wisdom, level, setValue]);

  useEffect(() => {
    setValue(
      SavingThrows.EVASION,
      savingThrowCalc(max([dexterity, intelligence])!, level)
    );
  }, [dexterity, intelligence, level, setValue]);

  return (
    <FormSection title="Saves">
      <NumberInput label="Physical" name={SavingThrows.PHYSICAL} readOnly />
      <NumberInput label="Mental" name={SavingThrows.MENTAL} readOnly />
      <NumberInput label="Evasion" name={SavingThrows.EVASION} readOnly />
      <NumberInput label="Luck" name={SavingThrows.LUCK} readOnly />
    </FormSection>
  );
}
