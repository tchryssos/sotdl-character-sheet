import { max } from 'lodash';
import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { RpgIcons } from '~/constants/icons';
import { calcAttributeBonus } from '~/logic/utils/rulebookSpecific/wwn/calcAttributeBonus';
import { WwnCharacterData } from '~/typings/wwn/characterData';

import { AcContext } from '../AcProvider';

const savingThrowCalc = (attr: number, level: number) =>
  16 - level - calcAttributeBonus(attr);

enum SavingThrows {
  PHYSICAL = 'save_physical',
  MENTAL = 'save_mental',
  EVASION = 'save_evasion',
  LUCK = 'save_luck',
}

const ARMOR_CLASS = 'armor_class';

function SaveInputs() {
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
    <GridBox>
      <NumberInput name={SavingThrows.PHYSICAL} readOnly />
      <NumberInput name={SavingThrows.MENTAL} readOnly />
      <NumberInput name={SavingThrows.EVASION} readOnly />
      <NumberInput name={SavingThrows.LUCK} readOnly />
    </GridBox>
  );
}

function ArmorClassInput() {
  const { register, setValue } = useFormContext();
  const { ac } = useContext(AcContext);

  useEffect(() => {
    register(ARMOR_CLASS);
  }, [register]);

  useEffect(() => {
    setValue(ARMOR_CLASS, ac);
  }, [setValue, ac]);

  return <NumberInput name={ARMOR_CLASS} readOnly />;
}

export function DefenseInputs() {
  return (
    <FormSection columns={1} icon={RpgIcons.HeartShield} title="Defenses">
      <ArmorClassInput />
      <SaveInputs />
    </FormSection>
  );
}
