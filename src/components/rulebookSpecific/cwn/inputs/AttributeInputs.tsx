import { startCase } from 'lodash';
import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSection } from '~/components/form/containers/FormSection';
import { RpgIcons } from '~/constants/icons';
import { ATTRIBUTES } from '~/constants/wwn/game';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { calcAttributeBonus } from '~/logic/utils/rulebookSpecific/wwn/calcAttributeBonus';
import { CwnCharacterData } from '~/typings/cwn/characterData';

import { BonusInput } from '../../../form/BonusInput';
import { NumberInputProps } from '../../../form/typings';
// import { AcContext } from '../AcProvider';

type AttributeInputProps<T> = Omit<NumberInputProps<T>, 'type' | 'name'> & {
  name: keyof Pick<
    CwnCharacterData,
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
  const isLessThanXs = useBreakpointsLessThan('xs');

  const { watch, setValue, getValues } = useFormContext<CwnCharacterData>();
  const constitution = watch('attribute_constitution');
  const constitutionRef = useRef(constitution);

  // Max system strain is _affected_ by constitution, but not solely
  // dependent on it
  useEffect(() => {
    const constitutionDifference = constitution - constitutionRef.current;
    const currSysMax = getValues('system_strain_max');

    setValue('system_strain_max', currSysMax + constitutionDifference);

    constitutionRef.current = constitution;
  }, [constitution, getValues, setValue]);

  return (
    <FormSection
      columns={isLessThanXs ? 2 : 3}
      icon={RpgIcons.Brain}
      title="Attributes"
    >
      {ATTRIBUTES.map((a) => (
        <AttributeInput key={a} name={`attribute_${a}`} />
      ))}
    </FormSection>
  );
}
