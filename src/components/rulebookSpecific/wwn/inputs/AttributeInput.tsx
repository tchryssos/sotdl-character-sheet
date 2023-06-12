import { startCase } from 'lodash';

import { WwnCharacterData } from '~/typings/wwn/characterData';

import { BonusInput } from '../../../form/BonusInput';
import { NumberInputProps } from '../../../form/typings';

type AttributeInputProps<T> = Omit<NumberInputProps<T>, 'type' | 'name'> & {
  name: keyof Pick<
    WwnCharacterData,
    | 'attribute_charisma'
    | 'attribute_constitution'
    | 'attribute_dexterity'
    | 'attribute_intelligence'
    | 'attribute_strength'
    | 'attribute_wisdom'
  >;
};

const bonusCalc = (attr: number) => {
  // There is no bonus calc in WWN
  // The rulebook just gives these ranges
  if (attr >= 18) {
    return 2;
  }

  if (attr >= 14) {
    return 1;
  }

  if (attr >= 8) {
    return 0;
  }

  if (attr >= 4) {
    return -1;
  }

  return -2;
};

export function AttributeInput<T extends Record<string, unknown>>({
  name,
}: AttributeInputProps<T>) {
  const label = startCase(name.split('_')[1] || name);

  return (
    <BonusInput
      bonusCalculationFn={bonusCalc}
      label={label}
      max={18}
      min={0}
      name={name}
    />
  );
}
