import { startCase } from 'lodash';

import { FormSection } from '~/components/form/FormSection';
import { RpgIcons } from '~/constants/icons';
import { ATTRIBUTES } from '~/constants/wwn/game';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { calcAttributeBonus } from '~/logic/utils/rulebookSpecific/wwn/calcAttributeBonus';
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

function AttributeInput<T extends Record<string, unknown>>({
  name,
}: AttributeInputProps<T>) {
  const label = startCase(name.split('_')[1] || name);

  return (
    <BonusInput
      bonusCalculationFn={calcAttributeBonus}
      label={label}
      max={18}
      min={0}
      name={name}
    />
  );
}

export function AttributeInputs() {
  const isLessThanSm = useBreakpointsLessThan('sm');
  return (
    <FormSection
      columns={isLessThanSm ? 2 : 3}
      icon={RpgIcons.Barbell}
      title="Attributes"
    >
      {ATTRIBUTES.map((a) => (
        <AttributeInput key={a} name={`attribute_${a}`} />
      ))}
    </FormSection>
  );
}
