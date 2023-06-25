import { startCase } from 'lodash';

import { SotdlCharacterData } from '~/typings/sotdl/characterData';

import { BonusInput } from '../../../form/BonusInput';
import { NumberInputProps } from '../../../form/typings';

type AttributeInputProps<T> = Omit<NumberInputProps<T>, 'type' | 'name'> & {
  name: keyof Pick<
    SotdlCharacterData,
    | 'attribute_agility'
    | 'attribute_intellect'
    | 'attribute_strength'
    | 'attribute_will'
  >;
};

const bonusCalc = (attr: number) => attr - 10;

export function AttributeInput<T extends Record<string, unknown>>({
  name,
}: AttributeInputProps<T>) {
  const label = startCase(name.split('_')[1] || name);
  return (
    <BonusInput
      bonusCalculationFn={bonusCalc}
      label={label}
      max={20}
      min={0}
      name={name}
    />
  );
}
