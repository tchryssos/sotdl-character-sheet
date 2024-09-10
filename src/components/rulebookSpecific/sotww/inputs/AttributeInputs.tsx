import { startCase } from 'lodash';

import { BonusInput } from '~/components/form/BonusInput';
import { FormSection } from '~/components/form/containers/FormSection';
import { NumberInputProps } from '~/components/form/typings';
import { RpgIcons } from '~/constants/icons';
import { ATTRIBUTES } from '~/constants/sotww/game';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

type AttributeInputProps<T> = Omit<NumberInputProps<T>, 'type' | 'name'> & {
  name: keyof Pick<
    SotwwCharacterData,
    | 'attribute_agility'
    | 'attribute_intellect'
    | 'attribute_strength'
    | 'attribute_will'
  >;
};

const bonusCalc = (attr: number) => attr - 10;

function AttributeInput<T extends Record<string, unknown>>({
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

export function AttributeInputs() {
  return (
    <FormSection
      columns={{ base: 4, sm: 2, md: 4 }}
      icon={RpgIcons.Brain}
      title="Attributes"
    >
      {ATTRIBUTES.map((a) => (
        <AttributeInput key={a} name={`attribute_${a}`} />
      ))}
    </FormSection>
  );
}
