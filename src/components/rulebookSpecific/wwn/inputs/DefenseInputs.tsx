import { max } from 'lodash';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { RpgIcons } from '~/constants/icons';
import { calcAttributeBonus } from '~/logic/utils/rulebookSpecific/wwn/calcAttributeBonus';
import { WwnArmor, WwnCharacterData } from '~/typings/wwn/characterData';

const savingThrowCalc = (attr: number, level: number) => 16 - level - attr;

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

// TODO: AC Context
const calculateArmorAc = (armors: WwnArmor[], dexterity: number) =>
  armors.reduce((currArmor, armor) => {
    if (armor.armor_readied) {
      if (armor.armor_defense > currArmor) {
        return armor.armor_defense;
      }
      if (armor.armor_weight === 'shield') {
        return currArmor + 1;
      }
      return currArmor;
    }
    return currArmor;
  }, 10 + calcAttributeBonus(dexterity));

const emptyArmors: WwnArmor[] = [];
function ArmorClassInput() {
  const { watch, register, setValue } = useFormContext();

  const armors: WwnArmor[] =
    watch<keyof WwnCharacterData>('armors') || emptyArmors;
  const dexterity: number =
    watch<keyof WwnCharacterData>('attribute_dexterity') || 10;

  useEffect(() => {
    register(ARMOR_CLASS);
  }, [register]);

  useEffect(() => {
    setValue(ARMOR_CLASS, calculateArmorAc(armors, dexterity));
  }, [armors, dexterity, setValue]);

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
